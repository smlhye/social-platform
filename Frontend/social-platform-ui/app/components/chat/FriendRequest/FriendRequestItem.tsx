"use client";

import { useGetInboxRequests, useAcceptRequest, useDeclineRequest } from "@/app/hooks/useFriendship";
import { AvatarUI } from "../../common/Avatar";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function FriendRequestsPage() {
    const { data, isLoading, isError } = useGetInboxRequests();
    const { mutate: accept, isPending: accepting } = useAcceptRequest();
    const { mutate: decline, isPending: declining } = useDeclineRequest();
    const queryClient = useQueryClient();

    const requests = data?.resData || [];

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError) return <p className="text-center mt-10">Error...</p>;

    const handleAcceptRequest = (id: string) => {
        accept(id, {
            onSuccess: () => alert("Accepted!"),
            onError: () => alert("Failed!"),
        });
    };

    const handleDeclineRequest = (id: string) => {
        decline(id, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inbox-requests"] }),
            onError: () => alert("Failed!"),
        });
    };

    return (
        <div className="space-y-2 w-full">
            {requests.map((req) => (
                <Link
                    key={req.id}
                    href="#"
                    className="block w-full rounded-lg shadow-sm transition
                 hover:shadow-md hover:bg-accent/10"
                >
                    <div className="flex items-center gap-3 p-3 cursor-pointer">
                        <AvatarUI avatar={req.avatar ?? ""} name={req.senderName} />

                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-card-foreground">
                                {req.senderName}
                            </p>
                            <p className="text-xs text-muted-foreground">Muốn kết bạn với bạn</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAcceptRequest(req.id);
                                }}
                                disabled={accepting}
                                className="px-3 py-1.5 text-sm font-medium rounded-md
                       bg-primary text-primary-foreground hover:bg-primary/90
                       disabled:opacity-50 transition"
                            >
                                Accept
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeclineRequest(req.id);
                                }}
                                disabled={declining}
                                className="px-3 py-1.5 text-sm font-medium rounded-md
                       bg-muted text-muted-foreground hover:bg-muted/90
                       disabled:opacity-50 transition"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}