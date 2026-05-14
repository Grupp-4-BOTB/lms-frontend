import ProfileForm from "@/components/profile/ProfileForm";
import ProfileBio from "@/components/profile/ProfileBio";
import ProfileCard from "@/components/profile/ProfileCard";

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p>profile page</p>
            <div className="flex gap-4">
                
                <ProfileBio />
                <ProfileForm />
            </div>
        </div>
    );
}