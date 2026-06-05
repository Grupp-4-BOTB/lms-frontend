import React from "react";

type props = {
    typingUsers: string[];
};

export default function UserTypingNotification({typingUsers} : props){
    return (
        <div className="mb-4 text-center text-sm text-[#2C3545]">
            {typingUsers.map((userName) => (
            <p key={userName}>{userName} is Typing...</p>
            ))}
        </div>
    );
}