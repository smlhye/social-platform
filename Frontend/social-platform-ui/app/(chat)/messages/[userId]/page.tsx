"use client";
import MessageArea from "@/app/page/chat/messages/chatarea/MessageArea";
import { useParams } from "next/navigation";

export default function ChatPage() {
    const params = useParams();
    const userId = params.userId as string;

    return <MessageArea userId={userId} />;
}