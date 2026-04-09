"use client";

import { useParams } from "next/navigation";
import { UserDetail } from "@/app/components/chat/SuggestionList/UserDetail";

export default function ContactPage() {
    const { id } = useParams<{ id: string }>();

    return <UserDetail userId={id} />;
}