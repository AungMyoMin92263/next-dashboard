"use client"

import React, {ChangeEvent, FormEvent, useRef, useState} from 'react';
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import {Input} from "@/app/components/ui/input";
import {Label} from "@/app/components/ui/label";
import {Button} from "@/app/components/ui/button";

interface UserFormData {
    name: string;
    email: string;
}

const GuestsRegistrationDetailPage = () => {
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null);   // Clear previous errors
        setResponseMessage(""); // Clear previous success messages

        try {
            const response = await fetch("/api/registration/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setResponseMessage("Your message has been sent successfully!");
                setFormData({ name: "", email: "",});
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please check your connection and try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <Card header="Registration">
                <form onSubmit={handleSubmit}>
                    <div className="content grid grid-cols-2 gap-4">
                        <div className="flex align-center">
                            <Label htmlFor="username" className="flex items-center">Username</Label>
                        </div>
                        <div className="">
                            <Input className=""
                                   type="text"
                                   name="name"
                                   placeholder="Enter your username"
                                   value={formData.name}
                                   onChange={handleChange}
                                   required
                            />
                        </div>

                        <div className="flex align-center">
                            <Label htmlFor="username" className="flex items-center">Email</Label>
                        </div>
                        <div className="">
                            <Input className=""
                                   type="text"
                                   name="email"
                                   placeholder="Enter your email"
                                   value={formData.email}
                                   onChange={handleChange}
                                   required
                            />
                        </div>
                    </div>

                    <div className="flex align-center mt-6 justify-end">
                        <div className="flex flex-col">
                            <div className="flex justify-end">
                                <Button size='lg'
                                        variant="ghost"
                                        className="bg-[--accent] hover:bg-[--accent-foreground] text-white"
                                        disabled={loading}
                                >{loading ? "Submitting..." : "Submit"}</Button>
                            </div>
                            <div className='mt-2'>
                                {error && <p style={{color: "red"}}>{error}</p>}
                            </div>


                        </div>

                    </div>
                </form>


            </Card>
        </>
    );
};

export default GuestsRegistrationDetailPage;
