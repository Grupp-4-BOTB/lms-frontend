"use client";

import WaitingRoom from "../../../components/livechat/WaitingRoom";
import ChatRoom from "../../../components/livechat/ChatRoom"
import { useRef, useState } from "react";
import {HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export type Message = {
    time: string;
    userName: string;
    message: string;

}


export default function UserTypingNotification({}){
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const currentUserName = useRef<string>("");
    const currentChatRoom = useRef<string>("");


    const startTyping = async () => {
        try{
            await connection?.invoke("StartTyping", currentUserName.current, currentChatRoom.current)
        }
        catch(error:any){
            console.error("Failed to notify start typing", error)
        }
    }
    const stopTyping = async () => {
        try{
            await connection?.invoke("StopTyping", currentUserName.current, currentChatRoom.current)
        }
        catch(error:any){
            console.error("Failed to notify stop typing", error)
        }
    }


    const sendMessage = async (message:string) => {
        try{
            await connection?.invoke("SendMessage", message);
            await connection?.invoke("StopTyping", currentUserName.current, currentChatRoom.current);
        }
        catch(error:any){
            console.error("Failed to send message", error)
        }
    }

    const joinChatRoom = async (userName:string, chatRoom:string) => {
        try{
            const hubConnection = new HubConnectionBuilder().withUrl("https://webapp-livechat-richard-esbkaceyega6guh4.swedencentral-01.azurewebsites.net/chathub").build();

            hubConnection.on("ReceiveMessage", (time:string, userName:string, message:string) => {
                setMessages(messages => [...messages, {time, userName, message}]);
            })


            hubConnection.on("UserTyping", (userName:string) => {
                setTypingUsers(users => [...new Set([...users, userName])]);
            })
            hubConnection.on("UserStoppedTyping", (userName:string) => {
                setTypingUsers(users => users.filter(x => x != userName));
            })
            await hubConnection.start();
            await hubConnection.invoke("JoinSpecificChatRoom", {userName, chatRoom});

            setConnection(hubConnection)
            currentUserName.current = userName;
            currentChatRoom.current = chatRoom;
        }
        catch(error:any){
            console.error("Failed to join chat room", error);
        }
    }

        return (
           <>
                {!connection ? (
                    <WaitingRoom joinChatRoom={joinChatRoom} />
                ) : (
                    <ChatRoom
                        messages={messages}
                        sendMessage={sendMessage}
                        currentUserName={currentUserName.current}
                        typingUsers={typingUsers}
                        startTyping={startTyping}
                        stopTyping={stopTyping}
                    />
                )}
            </>
    );
}