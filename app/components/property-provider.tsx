'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type PropertyProviderState = {
    property: string;
    setProperty: (property: string) => void;
};

const initialState: PropertyProviderState = {
    property: "",
    setProperty: () => {
        throw new Error("setProperty must be used within a PropertyProvider");
    },
};

type PropertyProviderProps = {
    children: React.ReactNode;
    storageKey?: string;
};

const PropertyProviderContext = createContext<PropertyProviderState>(initialState);

const PropertyProvider: React.FC<PropertyProviderProps> = ({ children, storageKey = "property_id" }) => {
    const [property, setProperty] = useState<string>("");

    useEffect(() => {
        const storedProperty = localStorage.getItem(storageKey);
        if (storedProperty) {
            setProperty(storedProperty);
        }
    }, [storageKey]);

    const updateProperty = (newProperty: string) => {
        try {
            localStorage.setItem(storageKey, newProperty);
            setProperty(newProperty);
        } catch (error) {
            console.error("Failed to set property in localStorage", error);
        }
    };

    const value = {
        property,
        setProperty: updateProperty,
    };

    return (
        <PropertyProviderContext.Provider value={value}>
            {children}
        </PropertyProviderContext.Provider>
    );
};

export const useProperty = (): PropertyProviderState => {
    const context = useContext(PropertyProviderContext);

    if (!context) {
        throw new Error("useProperty must be used within a PropertyProvider");
    }

    return context;
};

export default PropertyProvider;
