import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../schemas/common.schema";
import { FriendListResponse, InboxRequestList, SendRequestPayload } from "../schemas/friend.schema";
import { FriendAPI } from "../api/friendship.api";
import { END_POINTS } from "../api/config";

export const useFriends = () => {
    return useQuery<ApiResponse<FriendListResponse>>({
        queryKey: ["friends"],
        queryFn: FriendAPI.getFriends
    });
};

export const useSendRequest = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<null>, Error, SendRequestPayload>({
        mutationFn: FriendAPI.sendFriendshipRequest,
        onSuccess: (_, variables) => {
            // 🔥 refetch user detail
            queryClient.invalidateQueries({
                queryKey: ["get-user", variables.addresseeId],
            });

            // 🔥 (optional) update suggestion list
            queryClient.invalidateQueries({
                queryKey: ["suggestion-users"],
            });
        },
    })
}

export const useCancelRequest = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<null>, Error, string>({
        mutationFn: (id) => FriendAPI.cancelFriendshipRequest(id),

        onSuccess: (_, targetId) => {
            // 🔥 refetch suggestion list
            queryClient.invalidateQueries({
                queryKey: ["suggestion-users"],
            });

            // 🔥 refetch user detail (nếu đang mở)
            queryClient.invalidateQueries({
                queryKey: ["get-user", targetId],
            });
        },
    })
}

export const useGetInboxRequests = () => {
    return useQuery<ApiResponse<InboxRequestList>>({
        queryKey: ["inbox-requests"],
        queryFn: FriendAPI.getInboxRequest
    })
}

export const useAcceptRequest = () => {
    return useMutation<ApiResponse<null>, Error, string>({
        mutationFn: (id) => FriendAPI.acceptRequest(id)

    })
}

export const useDeclineRequest = () => {
    return useMutation<ApiResponse<null>, Error, string>({
        mutationFn: (id) => FriendAPI.declineRequest(id)
    })
}