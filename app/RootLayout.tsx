// Add "use client" at the top to indicate it's a client-side component
"use client";

import {useState} from "react"; // Importing useState hook
import localFont from "next/font/local";
import "./globals.css";
import {Inter} from "next/font/google";
import Navbar from "@/app/components/Navbar";
import {ThemeProvider} from "@/app/components/theme-provider";
import Sidebar from "@/app/components/Sidebar";
import PropertyProvider from "@/app/components/property-provider";

// Client-side font imports
const inter = Inter({subsets: ["latin"]});
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // Use the useState hook here for the sidebar state
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarExpanded((prev) => !prev);
    };

    return (
        <PropertyProvider>
            <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
                <html lang="en">
                    <body className={inter.className}>
                        <div className="w-full">
                            <Navbar onToggleSidebar={handleToggleSidebar}/>
                        </div>
                        <div className="w-full flex h-[calc(100vh-4rem)] ">
                            <div className={`transition-all ${isSidebarExpanded ? 'w-1/10' : 'w-1/100'}`}>
                                <Sidebar isSidebarExpanded={isSidebarExpanded}/>
                            </div>
                            <div className="flex-1">
                                {children}
                            </div>
                        </div>
                    </body>
                </html>
            </ThemeProvider>
        </PropertyProvider>
    );
}
