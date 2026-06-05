"use client";

import { Message } from "@/app/(dashboard)/liveclass/page";
import { useEffect, useRef } from "react";

type props = {
    messages:Message[]
    currentUserName: string
}


export default function MessageList({messages, currentUserName} : props){
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect( () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <div className="flex-1 space-y-6 overflow-y-auto pr-1">
            {messages.map((item, index) => {
            const isMe = item.userName === currentUserName;

            return (
                <div
                key={index}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                <p className="mb-2 text-sm font-semibold text-[#2C3545]">
                    {isMe ? "You" : item.userName}
                </p>

                <div
                    className={`max-w-[75%] rounded-lg px-4 py-3 text-sm text-[#2C3545] ${
                    isMe ? "bg-[#FFF1EB]" : "bg-[#F1F2F4]"
                    }`}
                >
                    {item.message}
                </div>

                <span className="mt-2 text-xs text-[#B5B5B5]">
                    {item.time}
                </span>
                </div>
            );
            })}

            <div ref={messagesEndRef}></div>
        </div>
    );
}