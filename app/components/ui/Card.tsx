import React from 'react';

interface CardProps {
    header?: React.ReactNode; // Optional prop for header content
    children?: React.ReactNode; // Content inside the card body
    footer?: React.ReactNode; // Optional prop for footer content
    className?: string; // Optional prop for custom classes
}

const Card: React.FC<CardProps> = ({ header, children, footer, className }) => {
    return (
        <div className={`border rounded-lg shadow-md p-8 bg-[var(--primary) ${className}`}>
            {header && <div className="font-bold text-lg mb-2 border-b pb-2">{header}</div>}
            <div className="text-gray-700">{children}</div>
            {footer && <div className="mt-4 pt-2 border-t text-sm text-gray-500">{footer}</div>}
        </div>
    );
};

export default Card;
