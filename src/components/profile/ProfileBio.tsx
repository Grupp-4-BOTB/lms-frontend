"use client";

import ProfileCard from "./ProfileCard";
import Skills from "./Skills/Skills";

interface ProfileBioProps {
    photoUrl: string | null;
    onPhotoChange: (url: string) => void;
    firstName: string;
    lastName: string;
    description: string;
}

export default function ProfileBio({ photoUrl, onPhotoChange, firstName, lastName, description }: ProfileBioProps) {

    return (
        <div className="flex flex-col gap-4 p-3 m-3 bg-white rounded-3xl w-[400px] h-[715px] justify-start ">
            <ProfileCard 
            photoUrl={photoUrl} 
            onPhotoChange={onPhotoChange}
            firstName={firstName}
            lastName={lastName}
            />
            <Skills ownerId="user123" isOwner={true}    />
            
            <div className="py-2">
                <p className="text-primary text-lg font-bold px-3 mb-2">Bio</p>
                 <textarea
                    readOnly
                    value={description}
                    placeholder="Tell us about yourself..."
                    className="bg-[var(--background-color)] rounded-lg p-4 text-sm text-[#AAA] outline-none resize-none h-[250px] w-[380px] cursor-default"
                />
            </div>

        </div>
    );
}