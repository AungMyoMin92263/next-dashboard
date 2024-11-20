"use client";

import React, { useState } from 'react';
import { ModeToggle } from "@/app/components/mode-toggle";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { Bell, ListCollapse } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@/app/components/ui/dropdown-menu";
import ProfilePicture from "@/app/components/ui/ProfilePicture";
import { propertySettingsList } from "@/PropertySettings";
import {useProperty} from "@/app/components/property-provider";


type Property ={
    id: string;
    property_name: string;
    auth_url: string,
    url: string,
    username: string,
    password: string,
    timeout: string,

}
const Navbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
    const props = propertySettingsList; // Use the list version of property settings
    const [selectedProperty, setSelectedProperty] = useState(props[0].property_name); // Set default to the first property
    const { setProperty } = useProperty();

    const handleClick = (property:Property)=>{
        console.log("clicked", property.id);
        setSelectedProperty(property.property_name);
        setProperty(property.id);
    }

    return (
        <div className="bg-[var(--primary)] h-16 flex items-center justify-between shadow-md">
            <div className="p-4 flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="lg">
                            {selectedProperty} {/* Display the selected property */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {props.map((prop) => (
                            <DropdownMenuItem
                                key={prop.id} // Use `id` as the unique key
                                onClick={() => {
                                    handleClick(prop); // Update selected property when clicked
                                    console.log(`Selected Property: ${prop.property_name}`);
                                }}
                            >
                                {prop.property_name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
                    <ListCollapse />
                </Button>
            </div>
            <div className="flex items-center justify-between p-4">
                <Button className="bg-background" variant="outline">
                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                </Button>

                <ProfilePicture name="admin" size={80} />
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;
