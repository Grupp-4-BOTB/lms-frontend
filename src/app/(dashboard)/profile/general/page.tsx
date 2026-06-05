"use client";

import ProfileForm from "@/components/profile/ProfileForm";
import ProfileBio from "@/components/profile/ProfileBio";
import ProfileRouting from "@/components/ui/ProfileRouting";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch (
                `https://webapp-userprofileservice-emil-hdgxb8chhfejg8ae.germanywestcentral-01.azurewebsites.net/api/profiles/test-user`,
                {
                    headers: {
                        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY!
                    }
                }
            );
            if (response.ok) {
                const data = await response.json();
                setFirstName(data.firstName ?? "");
                setLastName(data.lastName ?? "");
                setDescription(data.description ?? "");
                setPhotoUrl(data.photoUrl ?? null);
            }
        }
    fetchProfile();
    }, []);


    return (
        <div className="flex flex-col ">
            <div className="font-bold text-[45px] px-4">Profile</div>
            
                  <div className="w-1/2 px-2">
                    <ProfileRouting />
                  </div>

            <div className="flex gap-4">
                
                <ProfileBio 
                    photoUrl={photoUrl} 
                    firstName={firstName}
                    lastName={lastName}
                    description={description} 
                />
                <ProfileForm 
                    photoUrl={photoUrl}
                    onPhotoChange={setPhotoUrl}
                    initialFirstName={firstName}
                    initialLastName={lastName}
                    initialDescription={description}
                    onSaved={(data) => {
                        setFirstName(data.firstName);
                        setLastName(data.lastName);
                        setDescription(data.description);
                        setPhotoUrl(data.photoUrl);
                        window.location.reload();
                    }}
                />
            </div>
        </div>
    );
}