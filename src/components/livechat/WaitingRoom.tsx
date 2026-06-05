"use client";

import { useState } from "react";
import ChatRoom from "./ChatRoom";

type props = {
    joinChatRoom: (userName:string, chatRoom:string ) => Promise<void>
}


export default function WaitingRoom ({joinChatRoom} : props){

    const [userName, setUserName] = useState<string>("");
    const [chatRoom, setChatRoom] = useState<string>("standard");


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinChatRoom(userName, chatRoom)
    }



        return(
                <div className="flex min-h-[700px] items-center justify-center">
                <div className="w-full max-w-md rounded-[30px] bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-[#2C3545]">
                    Join Live Chat
                </h1>

                <p className="mt-2 text-sm text-gray-400">
                    Enter your name and choose a chat room to start chatting.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                    <label className="mb-2 block text-sm font-medium text-[#2C3545]">
                        Your name
                    </label>

                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                    </div>

                    <div>
                    <label className="mb-2 block text-sm font-medium text-[#2C3545]">
                        Chat room
                    </label>

                    <input
                        value={chatRoom}
                        onChange={(e) => setChatRoom(e.target.value)}
                        placeholder="Chatroom"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                    />
                    </div>

                    <button
                    type="submit"
                    className="w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                    Join Chat
                    </button>
                </form>
                </div>
        </div>
    );
}