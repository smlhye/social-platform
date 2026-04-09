"use client";

import FriendRequestList from "@/app/components/chat/FriendRequest/FriendRequestList";
import SuggestionList from "@/app/components/chat/SuggestionList/SuggestionList";
import { SearchInput } from "@/app/components/common/Input";
import { useEffect, useState } from "react";

export default function ContactLayout({ children }: { children: React.ReactNode; }) {

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    // debounce trực tiếp trong component
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(handler);
    }, [query]);

    return (


        <div className="flex h-full">
            {/* LEFT */}
            <div className="w-[60%] flex flex-col overflow-y-auto">
                <div className="p-4">
                    <FriendRequestList />
                </div>

                <div className="flex-1 p-4 pt-0">
                    <SearchInput value={query} onChange={setQuery} />
                    <SuggestionList search={debouncedQuery} />
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-[40%] h-full bg-muted/30 border-l border-border">
                {children}
            </div>
        </div>
    );
}