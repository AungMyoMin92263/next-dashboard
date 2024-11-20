// app/guests/registration/page.tsx
"use client"

import React from 'react';
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import { useFetch } from "@/app/hooks/useFetch";

const RegistrationPage = () => {
    // Define table columns
    const columns = ['Name', 'Age', 'Email'];

    // Fetch data using useFetch hook (replace 'your-api-url' with the actual API URL)
    // const { data, loading, error } = useFetch<any[]>('https://hotel-qa.gtriip.com');
    const data = [
        { id:"1", Name: "Alice", Age: 25, Email: "alice@example.com" },
        { id:"2", Name: "Bob", Age: 30, Email: "bob@example.com" },
        { id:"3", Name: "Charlie", Age: 35, Email: "charlie@example.com" },
    ];

    // // Handle loading and error states
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <Card header="Registration">
                <Table columns={columns} data={data} striped bordered hover />
            </Card>
        </div>
    );
};

export default RegistrationPage;
