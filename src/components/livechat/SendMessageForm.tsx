"use client"

import React, {useState, useRef} from "react";

type SendMessageFormProps = {
    sendMessage: (message: string) => void;
    startTyping: () => void;
    stopTyping: () => void;
};

export default function SendMessageForm({ sendMessage, startTyping, stopTyping} : SendMessageFormProps){

    const [message, setMessage] = useState<string>("");
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        }
        startTyping();

        typingTimeoutRef.current = setTimeout(() => {
            stopTyping();

        }, 2000);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
        stopTyping();
        if (typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current)
        }
    };

        return (
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex items-center gap-2 rounded-2xl bg-[#F8F8F8] p-2">
                <input
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type message..."
                    className="flex-1 bg-transparent px-3 text-sm text-[#2C3545] outline-none placeholder:text-[#BDBDBD]"
                />

                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EDEDED] text-[#BDBDBD]"
                >
                    🔗
                </button>

                <button
                    type="submit"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6636] text-white"
                >
                    ➤
                </button>
                </div>
            </form>
        );
    

}