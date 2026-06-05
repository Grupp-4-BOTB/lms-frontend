"use client";

interface ProfileCardProps {
    photoUrl: string | null;
    firstName: string;
    lastName: string;
}

export default function ProfileCard({ photoUrl, firstName, lastName }: ProfileCardProps) {
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