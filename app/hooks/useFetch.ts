"use client"

import { useState, useEffect } from 'react';
import { fetchToken } from "@/app/lib/utils.ts";
import {useProperty} from "@/app/components/property-provider";

export const useFetch = <T>(url: string, params: object = {}) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const { property, setProperty } = useProperty();
	console.log("property", property);
	// Fetch the token once when the component mounts
	useEffect(() => {
		const getToken = async () => {
			const storedToken = localStorage.getItem('token');
			if (storedToken) {
				setToken(storedToken);
			} else {
				const fetchedToken = await fetchToken(property);
				if (fetchedToken) {
					localStorage.setItem('token', fetchedToken);
					setToken(fetchedToken);
				} else {
					setError('Failed to retrieve token');
				}
			}
		};

		getToken();
	}, []);

	// Set headers once the token is retrieved
	const defaultHeaders = {
		'Content-Type': 'application/json',
		'Content-Language': 'en', // You can make this dynamic if needed
		'X-SITE-ID': 'flt', // Example, replace with actual site ID
		'X-SITE-NAME': 'flt', // Example, replace with actual site name
		Authorization: token ? `Bearer ${token}` : '',
	};

	// Create a URL with query parameters
	const urlWithParams = new URL(url);
	Object.keys(params).forEach((key) => {
		urlWithParams.searchParams.append(key, params[key]);
	});

	useEffect(() => {
		// Fetch data only when token is set
		if (!token) return;

		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(urlWithParams.toString(), {
					method: 'GET',
					headers: defaultHeaders,
				});

				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}

				const result = await response.json();
				setData(result);
			} catch (err) {
				setError('Error fetching data');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url, params, token]); // Re-run when `url`, `params`, or `token` changes

	return { data, loading, error };
};
