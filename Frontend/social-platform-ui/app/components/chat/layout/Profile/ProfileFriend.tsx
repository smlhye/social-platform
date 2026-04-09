"use client";

import { AvatarUI } from "@/app/components/common/Avatar";
import { FriendListResponse, FriendResponse } from "@/app/schemas/friend.schema";

type Props = {
    friends: FriendListResponse;
    onInfo: (user: FriendResponse) => void;
};

export default function FriendSection({ friends, onInfo }: Props) {
    return (
        <div className="
      w-full h-full flex flex-col
      rounded-2xl border border-second-border
      bg-card text-card-foreground
      shadow-float
      overflow-hidden
    ">

            {/* Header */}
            <div className="px-4 pt-4 pb-2">
                <h2 className="text-lg font-semibold tracking-tight">
                    Friends
                </h2>
                <p className="text-xs text-muted-foreground">
                    Your connections
                </p>
            </div>

            {/* Search */}
            <div className="px-4 pb-3">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground select-none">
                        🔍
                    </span>
                    <input
                        placeholder="Search friends..."
                        className="
              w-full h-10 pl-9 pr-3
              text-sm rounded-lg
              border border-input
              bg-sub-background text-sub-foreground
              focus:outline-none focus:ring-1 focus:ring-ring
              transition duration-200
            "
                    />
                </div>
            </div>

            {/* Friend List */}
            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2 scroll-overlay">

                {friends.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-sm text-muted-foreground">
                            No friends found
                        </span>
                    </div>
                )}

                {friends.map((f) => (
                    <div
                        key={f.id}
                        onClick={() => onInfo(f)}
                        className="
              group flex items-center gap-3
              px-3 py-3
              rounded-xl
              cursor-pointer
              transition-all duration-200
              hover:bg-sub-background/70
              active:scale-[0.97]
            "
                    >
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <AvatarUI
                                avatar={f.avatar ?? undefined}
                                name={f.fullName}
                                size={44}
                            />
                            {f.isOnline && (
                                <span className="
                  absolute bottom-0 right-0
                  w-3.5 h-3.5
                  bg-primary
                  border-2 border-card
                  rounded-full
                  shadow-sm
                  animate-pulse
                " />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium text-card-foreground truncate">
                                {f.fullName}
                            </span>
                            <span className={`text-xs ${f.isOnline ? "text-primary" : "text-muted-foreground"}`}>
                                {f.isOnline ? "Online" : "Offline"}
                            </span>
                        </div>

                        {/* Hover hint */}
                        <div className="
              opacity-0 group-hover:opacity-100
              text-xs text-muted-foreground
              transition
            ">
                            View
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}