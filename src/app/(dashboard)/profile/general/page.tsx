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
    const API_KEY = "Test123!"; //I en vanlig app skulle denna inte vara hårdkodad utan hämtas på ett säkert sätt, t.ex. från en miljövariabel(.env)
    const PROFILE_SERVICE_URL = "https://webapp-userprofileservice-emil-hdgxb8chhfejg8ae.germanywestcentral-01.azurewebsites.net";

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch (
                `${PROFILE_SERVICE_URL}/api/profiles/test-user`,
                {
                    headers: {
                        "X-API-Key": API_KEY
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