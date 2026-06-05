import UserTypingNotification from "./UserTypingNotification";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { Message } from "@/app/(dashboard)/liveclass/page";

type Props = {
    messages: Message[];
    sendMessage: (message: string) => Promise<void>;
    currentUserName: string;
    typingUsers: string[];
    startTyping: () => Promise<void>;
    stopTyping: () => Promise<void>;
};

export default function ChatRoom({
    messages,
    sendMessage,
    currentUserName,
    typingUsers,
    startTyping,
    stopTyping
}: Props) {
        return (
        <section className="flex h-[850px] w-full max-w-sm flex-col rounded-[30px] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2C3545]">Live Chat</h2>

            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F8F8] text-[#BDBDBD]">
                ...
            </button>
            </div>

            <MessageList
            messages={messages}
            currentUserName={currentUserName}
            />

            <UserTypingNotification typingUsers={typingUsers} />

            <SendMessageForm
            sendMessage={sendMessage}
            startTyping={startTyping}
            stopTyping={stopTyping}
            />
        </section>
    );
}