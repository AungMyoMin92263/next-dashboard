// app/guests/layout.tsx
'use client'

import React from 'react';
import Link from "next/link";
import {CircleGauge, CircleUser, Cog, Settings, UserCog} from "lucide-react";
import {usePathname} from "next/navigation";

const GuestsLayout = ({ children }: { children: React.ReactNode }) => {
    const router = usePathname(); // Access the current route
    console.log("Router",router);
    // A helper function to determine if the link is active
    const isActive = (path: string): boolean => router.includes(path) ;

    return (
        <div>
            {/* Common Layout for the guests section */}
            <header className="p-8 ">
                {/* Header Content, could be Navbar */}
                <nav className="flex w-full bg-[var(--primary)] rounded-lg shadow-md">
                    <Link href="/guests/registration/" passHref>
                        <div
                            className={`hover:bg-[var(--secondary)] rounded-lg p-4 flex gap-2 ${isActive('/guests/registration') ? 'bg-[var(--secondary)] rounded-lg' : ''}`}>
                            Registration
                        </div>
                    </Link>
                    <Link href="/guests/check_in/" passHref>
                        <div
                            className={`hover:bg-[var(--secondary)] rounded-lg p-4 flex gap-2 ${isActive('/guests/check_in') ? 'bg-[var(--secondary)] rounded-lg' : ''}`}>
                            Check Ins
                        </div>
                    </Link>
                    <Link href="/guests/request_key/" passHref>
                        <div
                            className={`hover:bg-[var(--secondary)] rounded-lg p-4 flex gap-2 ${isActive('/guests/request_key') ? 'bg-[var(--secondary)] rounded-lg' : ''}`}>
                            Request Key
                        </div>
                    </Link>
                    <Link href="/guests/check_out/" passHref>
                        <div
                            className={`hover:bg-[var(--secondary)] rounded-lg p-4 flex gap-2 ${isActive('/guests/check_out') ? 'bg-[var(--secondary)] rounded-lg' : ''}`}>
                            Check Outs
                        </div>
                    </Link>

                </nav>
            </header>
            <main className="p-8">{children}</main>
        </div>
    );
};

export default GuestsLayout;
