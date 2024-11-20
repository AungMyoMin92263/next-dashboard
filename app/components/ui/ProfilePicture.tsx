import React from 'react';

interface ProfileProps {
    name: string;
    imageUrl?: string;
    size?: number;
}

const ProfilePicture: React.FC<ProfileProps> = ({ name, imageUrl, size = 40 }) => {
    const firstLetter = name.charAt(0).toUpperCase(); // Get the first letter of the name

    return (
        <div className="flex items-center justify-center rounded-full" style={{ width: size, height: size }}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={name}
                    className="rounded-full object-cover"
                    style={{ width: size, height: size }}
                />
            ) : (
                <div className="flex items-center justify-center bg-gray-500 text-white p-2 rounded-full w-8 h-8">
                    {firstLetter}
                </div>
            )}
        </div>
    );
};

export default ProfilePicture;
