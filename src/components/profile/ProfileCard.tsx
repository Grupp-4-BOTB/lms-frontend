"use client";

// import { useState, useRef } from "react";

interface ProfileCardProps {
    photoUrl: string | null;
    // onPhotoChange: (url: string) => void;
    firstName: string;
    lastName: string;
}

export default function ProfileCard({ photoUrl, firstName, lastName }: ProfileCardProps) {
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const PHOTO_SERVICE_URL = "https://webapp-photoservice-emil-b7h6anhxdsamgzfx.germanywestcentral-01.azurewebsites.net";
    // const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

    // async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         // Visa preview lokalt
    //         const url = URL.createObjectURL(file);
    //         onPhotoChange(url);

    //         const formData = new FormData();
    //         formData.append("file", file);

    //         const response = await fetch(
    //             `${PHOTO_SERVICE_URL}/api/images/upload`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                 "X-API-Key": API_KEY
    //                 },
    //                 body: formData,
    //             }
    //         );
    //         const data = await response.json();

    //         // Byt ut lokal preview-URL mot den riktiga Blob Storage-URL:en
    //         onPhotoChange(data.url);
    //         console.log("Upload image URL:", data.url);
    //     }
    // }
    return (
        <div className="flex flex-col justify-center items-center mb-2 relative ">
            <div>
                <img className="w-full  rounded-xl" src="/profile-banner.svg" alt="" />
            </div>
            <div className="relative -mt-13">
                <div className="w-23 h-23 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                    <img 
                        src={photoUrl ?? "https://shikostorage254.blob.core.windows.net/images/profile3-icon.svg"} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>
            <h2 className="text-primary text-lg font-bold">{firstName || lastName ? `${firstName} ${lastName}` : "Your Name"}</h2>
            <span className="py-1 px-4 bg-orange-100 rounded-full text-orange-600 text-xs">Student</span>
        </div>
    );
}