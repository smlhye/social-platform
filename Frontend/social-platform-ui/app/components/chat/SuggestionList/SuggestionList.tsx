"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSuggestionUsersInfinite } from "@/app/hooks/useUser";
import { useCancelRequest, useSendRequest } from "@/app/hooks/useFriendship";
import UserItem from "./UserItem/UserItem";
import UserItemSkeleton from "./UserItem/UserItemLoading";
import { CircularProgress } from "@mui/material";

interface SuggestionListProps {
    search: string;
    onSelect?: (user: any) => void;
    selectedUser?: any;
}

export default function SuggestionList({
    search,
    onSelect,
    selectedUser
}: SuggestionListProps) {


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        isLoading
    } = useSuggestionUsersInfinite(search, 10);


    const users = useMemo(() => data?.pages.flatMap(page => page.resData.data) ?? [], [data]);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [showLoading, setShowLoading] = useState(false);

    const { mutate: send, isPending: sending } = useSendRequest();

    const { mutate: cancel, isPending: cancelling } = useCancelRequest();
    const handleSelect = useCallback((user: any) => onSelect?.(user), [onSelect]);
    const handleSend = useCallback((userId: string) => send({ addresseeId: userId }), [send]);
    const handleCancel = useCallback((userId: string) => cancel(userId), [cancel]);

    const [showSkeleton, setShowSkeleton] = useState(false);
    const startTime = useRef(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isFetching && !isFetchingNextPage) {
            startTime.current = Date.now();
            setShowSkeleton(true);
        } else {
            const elapsed = Date.now() - startTime.current;
            const delay = Math.max(0, 400 - elapsed); // 👈 400ms

            timeout = setTimeout(() => {
                setShowSkeleton(false);
            }, delay);
        }

        return () => clearTimeout(timeout);
    }, [isFetching, isFetchingNextPage]);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        if (observer.current) observer.current.disconnect(); // ngắt observer cũ nếu có

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.current.observe(loadMoreRef.current);

        return () => observer.current?.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (showSkeleton) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <UserItemSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="space-y-2">
                {users.map((user) => {
                    const isActive = selectedUser?.id === user.id;

                    return (
                        // <Link
                        //     key={user.id}
                        //     href={`/contact/${user.id}`}
                        //     onClick={() => onSelect?.(user)}
                        //     className={`block rounded-lg transition
                        //     shadow-sm hover:shadow-md
                        //     ${isActive
                        //             ? "bg-accent text-accent-foreground shadow-md ring-1 ring-border"
                        //             : "bg-card hover:bg-accent/50"}
                        // `}
                        // >
                        <UserItem
                            key={user.id}
                            user={user}
                            isActive={selectedUser?.id === user.id}
                            onSelect={handleSelect}
                            onSend={handleSend}
                            onCancel={handleCancel}
                        />
                        // </Link>
                    );
                })}
            </div>
            {/* loading more */}
            {hasNextPage && (
                <div ref={loadMoreRef} style={{ padding: "10px", textAlign: "center" }}>
                    {isFetchingNextPage && (
                        <div className="flex justify-center py-2 text-xs text-gray-500">
                            <CircularProgress className="w-4 h-4 animate-spin mr-1" />
                            Đang tải thêm...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}