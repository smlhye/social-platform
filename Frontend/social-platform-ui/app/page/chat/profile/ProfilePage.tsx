"use client";

import FriendSection from "@/app/components/chat/layout/Profile/ProfileFriend";
import ProfileView from "@/app/components/chat/layout/Profile/ProfileView";
import { FullScreenLoading } from "@/app/components/common/Loading";
import { useWebSocket } from "@/app/context/websocket.context";
import { useProfile } from "@/app/hooks/chat/useProfilePage";
import { FriendListResponse, FriendResponse } from "@/app/schemas/friend.schema";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function ProfilePage() {
    const { tab, setTab, me, isLoading, register, errors, onSubmit, friendList } = useProfile();

    const [selectedFriend, setSelectedFriend] = useState<FriendResponse | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [friends, setFriends] = useState<FriendListResponse>([]);

    const socketRef = useRef<Socket | null>(null);
    const currentUserId = me?.id;

    // ---------- update friends when API loads ----------
    useEffect(() => {
        if (friendList?.resData) {
            setFriends(friendList.resData);
        }
    }, [friendList]);

    // ---------- connect socket ----------
    const { socket } = useWebSocket();
    useEffect(() => {
        if (!socket) return;

        const handleOnline = ({ userId }: { userId: string }) => {
            setFriends(prev =>
                prev.map(f => f.id === userId ? { ...f, isOnline: true } : f)
            );
        };

        const handleOffline = ({ userId }: { userId: string }) => {
            setFriends(prev =>
                prev.map(f => f.id === userId ? { ...f, isOnline: false } : f)
            );
        };

        socket.off("userOnline", handleOnline);
        socket.off("userOffline", handleOffline);

        socket.on("userOnline", handleOnline);
        socket.on("userOffline", handleOffline);

        return () => {
            socket.off("userOnline", handleOnline);
            socket.off("userOffline", handleOffline);
        };
    }, [socket])

    if (isLoading || !me) return <FullScreenLoading />;

    return (
        <div className="w-full flex p-3 gap-3">
            <div className="w-[50%]">
                <ProfileView
                    tab={tab}
                    setTab={setTab}
                    me={me}
                    register={register}
                    errors={errors}
                    onSubmit={onSubmit}
                />
            </div>

            <div className="w-[50%]">
                <FriendSection
                    friends={friends}
                    onInfo={(friend) => {
                        setSelectedFriend(friend);
                        setOpenDialog(true);
                    }}
                />
            </div>
        </div>
    );
}