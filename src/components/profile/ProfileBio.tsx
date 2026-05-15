"use client";

import ProfileCard from "./ProfileCard";
import Skills from "./Skills/Skills";
import { useState } from "react";

export default function ProfileBio() {
    const [description, setDescription] = useState("");

    return (
        <div className="flex flex-col gap-4 p-3 m-3 bg-white rounded-3xl w-[400px] h-[940px] justify-start items-center">
            <ProfileCard />
            <Skills />
            
            <div className="w-full">
                <p className="text-primary text-lg font-bold px-2">Achievements</p>
            </div>
            
            <div className="py-2">
                <p className="text-primary text-lg font-bold px-3 mb-2">Bio</p>
                <textarea name="description" id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[var(--background-color)]  rounded-lg p-4 text-sm text-[#AAA] outline-none focus:border-orange-500 resize-none h-[250px] w-[380px]"></textarea>
            </div>

        </div>
    );
}