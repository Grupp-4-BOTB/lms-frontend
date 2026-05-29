"use client";

import ProfileForm from "@/components/profile/ProfileForm";
import ProfileBio from "@/components/profile/ProfileBio";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileRouting from "@/components/ui/ProfileRouting";
import { useState } from "react";

export default function ProfilePage() {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    return (
        <div className="flex flex-col ">
            <div className="font-bold text-[45px] px-4">Profile</div>
            
                  <div className="w-1/2 px-2">
                    <ProfileRouting />
                  </div>

            <div className="flex gap-4">
                
                <ProfileBio photoUrl={photoUrl} onPhotoChange={setPhotoUrl} />
                <ProfileForm photoUrl={photoUrl} onPhotoChange={setPhotoUrl} />
            </div>
        </div>
    );
}