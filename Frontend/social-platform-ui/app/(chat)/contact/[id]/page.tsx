"use client";

import { UserDetail } from "@/app/components/chat/SuggestionList/UserDetail";
import { useParams } from "next/navigation";

export default function ContactDetailPage() {
    const { id } = useParams();

    return (
        <div className="w-full h-full p-4">
            {/* reuse UserDetail hoặc ProfileView */}
            <UserDetail userId={id as string} />
        </div>
    );
}