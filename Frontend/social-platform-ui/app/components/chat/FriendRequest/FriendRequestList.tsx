"use client";

import { useAcceptRequest, useDeclineRequest, useGetInboxRequests } from "@/app/hooks/useFriendship";
import { InboxRequest } from "@/app/schemas/friend.schema";
import { AvatarUI } from "../../common/Avatar";
import { useQueryClient } from "@tanstack/react-query";

export default function FriendRequestsPage() {
    const { data, isLoading, isError } = useGetInboxRequests();

    const { mutate: accept, isPending: accepting } = useAcceptRequest();
    const { mutate: decline, isPending: declining } = useDeclineRequest();

    const queryClient = useQueryClient();

    const requests = data?.resData || [];

    const handleAcceptRequest = (id: string) => {
        accept(id, {
            onSuccess: (res) => alert("Success!"),
            onError: (err) => alert("Failed!")
        })
    }

    const handleDeclineRequest = (id: string) => {
        decline(id, {
            onSuccess: (res) => {
                queryClient.invalidateQueries({ queryKey: ["inbox-requests"] })
            },
            onError: (err) => alert("Failed!")
        })
    }

    if (isLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center mt-10">Error...</p>;
    }

    return (
        <div className="bg-color-background text-color-foreground flex items-center justify-center">
            <div className="w-full">
                {requests.map((req, idx: number) => (
                    <div
                        key={req.id}
                        className="relative bg-color-card text-color-card-foreground rounded-radius-mes p-3 flex items-center shadow-float animate-fadeUp"
                        style={{
                            animationDelay: `${idx * 150}ms`,
                            animationFillMode: "forwards",
                        }}
                    >
                        {/* avatar fake từ senderId */}
                        <AvatarUI avatar={""} name={req.senderName} />

                        <div className="ml-4 flex-1">
                            <p className="font-semibold">
                                {req.senderName}
                            </p>
                            <p className="text-sm text-color-muted-foreground">
                                Muốn kết bạn với bạn
                            </p>
                        </div>

                        <div className="flex space-x-2 ml-4">
                            <button onClick={() => handleAcceptRequest(req.id)} className="px-3 py-1 bg-color-primary text-color-primary-foreground rounded-radius-sm hover:opacity-90 transition">
                                Accept
                            </button>
                            <button onClick={() => handleDeclineRequest(req.id)} className="px-3 py-1 bg-color-muted text-color-muted-foreground rounded-radius-sm hover:opacity-90 transition">
                                Decline
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes fadeUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeUp {
                    animation: fadeUp 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}
