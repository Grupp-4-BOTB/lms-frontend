"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../ui/Button";

interface ProfileFormProps {
    photoUrl: string | null;
    onPhotoChange: (url: string) => void;
    initialFirstName: string;
    initialLastName: string;
    initialDescription: string;
    onSaved: (data: { firstName: string; lastName: string; description: string; photoUrl: string | null }) => void;
}

export default function ProfileForm({ photoUrl, onPhotoChange, initialFirstName, initialLastName, initialDescription, onSaved }: ProfileFormProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        setFirstName(initialFirstName);
        setLastName(initialLastName);
        setDescription(initialDescription);
    }, [initialFirstName, initialLastName, initialDescription]);


    async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onPhotoChange(url);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("ownerId", "test-user");

            const response = await fetch(
                `https://webapp-photoservice-emil-b7h6anhxdsamgzfx.germanywestcentral-01.azurewebsites.net/api/images/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data =await response.json();
            console.log("Upload image URL:", data.url);
        }
    }

    async function handleSave() {
        const response = await fetch(
            `https://webapp-userprofileservice-emil-hdgxb8chhfejg8ae.germanywestcentral-01.azurewebsites.net/api/profiles/test-user/update`,
            {
               method: "PUT",
               headers: {"Content-Type" : "application/json"},
               body: JSON.stringify({
                ownerId: "test-user",
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber || null,
                description: description || null,
                photoUrl: photoUrl || null,
               }),
            }
        );
        
        if (response.ok) {
        console.log("Profile saved!");
        onSaved({ firstName, lastName, description, photoUrl });
    } else if (response.status === 404) {
        const createResponse = await fetch(
            `https://webapp-userprofileservice-emil-hdgxb8chhfejg8ae.germanywestcentral-01.azurewebsites.net/api/profiles`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ownerId: "test-user",
                    firstName,
                    lastName,
                    phoneNumber: phoneNumber || null,
                    description: description || null,
                    photoUrl: photoUrl || null,
                }),
            }
        );
        if (createResponse.ok) {
            console.log("Profile created!");
            onSaved({ firstName, lastName, description, photoUrl });
        }
    }
}

    

    return (
        <div className="flex flex-col gap-4 p-6 m-3 bg-white rounded-xl w-[1000px] h-[650px]">
            <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                    {photoUrl ? (<img src={photoUrl} alt="" className="w-full h-full object-cover" />) : <img src="/profile3-icon.svg" alt="Placeholder" className="text-gray-400 text-xs" />}
                </div>

                <button className="rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-300 text-sm" onClick={() => fileInputRef.current?.click()}>
                    Upload photo
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="mb-1 text-sm font-medium text-black-700">
                    First Name *
                </label>
                <input type="text" 
                id="firstName" 
                value={firstName} 
                placeholder="First name" 
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="mb-1 text-sm font-medium text-black-700">
                    Last Name *
                </label>
                <input type="text" 
                id="lastName" 
                value={lastName} 
                placeholder="Last name" 
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="phoneNumber" className="mb-1 text-sm font-medium text-black-700">
                    Phone Number
                </label>
                <input type="tel" 
                id="phoneNumber" 
                value={phoneNumber} 
                placeholder="Enter phone number" 
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="mb-1 text-sm font-medium text-black-700">
                    Description
                </label>
                <textarea 
                id="description" 
                value={description} 
                placeholder="A passionate UI/UX Designer with hands-on experience designing intuitive, user-centered digital products across mobile and web platforms. With a strong foundation in user research, wireframing, prototyping, and visual design, 
                he instructor focuses on creating experiences that are not only visually appealing but also solve real user problems. 
                Having worked on projects in fintech, healthcare, travel, real estate, and SaaS, the instructor brings real-world insights 
                into the classroom bridging the gap between theory and industry practice." 
                onChange={(e) => setDescription(e.target.value)} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500 resize-none w-full h-[150px]" />
            </div>

            <div className="flex gap-4 py-6">
                <button className="rounded-lg px-4 py-2 bg-gray-200 text-gray-400 hover:bg-gray-300" onClick={() => console.log("Cancelled")}>Cancel</button>
                <button className="rounded-lg px-10 py-2 bg-orange-500 text-white hover:bg-orange-400" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}