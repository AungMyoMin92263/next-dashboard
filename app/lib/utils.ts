import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {propertySettingsList} from "@/PropertySettings";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const fetchToken = async (propertyId: string): Promise<string | null> => {
	// Retrieve settings based on propertyId
	const settings = propertySettingsList.find(
		(property) => property.id === propertyId
	);

	console.log("settings", settings); // Debugging

	if (!settings) {
		console.error("Property configuration not found.");
		return null;
	}

	const { username, password, auth_url, timeout } = settings;
	const credentials = btoa(username + ":" + password);

	// Check if token already exists in localStorage
	const storedToken = localStorage.getItem(`token_${propertyId}`);
	if (storedToken) {
		console.log("Using cached token");
		return storedToken;
	}

	// Prepare request headers
	const headers = {
		"Content-Type": "application/x-www-form-urlencoded",
		Authorization: `Basic ${credentials}`,
	};

	// Prepare request body
	const body = new URLSearchParams({
		grant_type: "client_credentials",
	});

	// Fetch with timeout utility
	const fetchWithTimeout = (
		url: string,
		options: RequestInit,
		timeout: number
	): Promise<Response> => {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => reject(new Error("Request timed out")), timeout);

			fetch(url, options)
				.then((response) => {
					clearTimeout(timer);
					resolve(response);
				})
				.catch((error) => {
					clearTimeout(timer);
					reject(error);
				});
		});
	};

	try {
		// Fetch token
		const response = await fetchWithTimeout(
			auth_url,
			{
				method: "GET",
				headers,
			},
			timeout
		);

		// If the response is not OK, handle it
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parse the JSON response (only once)
		const jsonResponse = await response.json();
		console.log("Token response:", jsonResponse);

		// Check and return the token
		if (jsonResponse.token) {
			localStorage.setItem(`token_${propertyId}`, jsonResponse.token);
			return jsonResponse.token;
		} else {
			throw new Error("Token not found in response");
		}
	} catch (error) {
		// Log the error for debugging
		console.error("Error fetching token:", error);

		// Return null to indicate failure in fetching the token
		return null;
	}
};

