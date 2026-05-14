"use client";

import ProfileCard from "./ProfileCard";
import Skills from "./Skills/Skills";
import { useState } from "react";

export default function ProfileBio() {
    const [description, setDescription] = useState("");

    return (
        <div className="flex flex-col gap-4 p-2 m-3 bg-white rounded-3xl w-[400px] h-[750px]">
            <ProfileCard />
            <Skills />
            <p className="text-primary text-lg font-bold">Achievements</p>
            <p className="text-primary text-lg font-bold">Bio</p>
            <textarea name="description" id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border bg-background border border-background rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 resize-none h-[150px]"></textarea>
        </div>
    );
}