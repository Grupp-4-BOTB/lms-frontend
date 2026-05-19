import ProfileForm from "@/components/profile/ProfileForm";
import ProfileBio from "@/components/profile/ProfileBio";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileRouting from "@/components/ui/ProfileRouting";

export default function ProfilePage() {
    return (
        <div className="flex flex-col ">
            <div className="font-bold text-[45px] px-4">Team</div>
            
                  <div className="w-1/2 px-2">
                    <ProfileRouting />
                  </div>
                  
            <div className="flex gap-4">
                
                <ProfileBio />
                <ProfileForm />
            </div>
        </div>
    );
}