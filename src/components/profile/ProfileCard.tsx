"use client";

import { useState, useRef } from "react";

export default function ProfileCard() {
    const [photo, setPhoto] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPhoto(url);
        }
    }
    return (
        <div className="flex flex-col justify-center items-center mb-2 relative ">
            <div>
                <img className="w-full  rounded-xl" src="/profile-banner.svg" alt="" />
            </div>
            <div className="relative -mt-13">
            <div className="w-23 h-23 rounded-full bg-white border-4 border-white flex items-center justify-center overflow-hidden">
                {photo ? (
                <img src={photo} alt="" className="w-full h-full object-cover" />
                ) : (
                <img src="/profile3-icon.svg" alt="Placeholder" className="w-full h-full" />
                )}
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-accent rounded-full flex items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img src="/profilepic-edit-icon.svg" alt="" className="w-16 h-16" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
            </div>
            <h2 className="text-primary text-lg font-bold">Hasan Mahmud</h2>
            <span className="py-1 px-4 bg-orange-100 rounded-full text-orange-600 text-xs">Student</span>
        </div>
    );
}