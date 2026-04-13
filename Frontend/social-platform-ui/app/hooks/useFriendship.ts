import { InfiniteData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../schemas/common.schema";
import { FriendListResponse, InboxRequestList, SendRequestPayload } from "../schemas/friend.schema";
import { FriendAPI } from "../api/friendship.api";
import { END_POINTS } from "../api/config";
import { SuggestionUserResponse } from "../schemas/user.schema";

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
            queryClient.invalidateQueries({
                queryKey: ["get-user", variables.addresseeId],
            });
            queryClient.setQueriesData<InfiniteData<ApiResponse<SuggestionUserResponse>>>(
                {
                    queryKey: ["suggestion-users"],
                    exact: false,
                },
                (old) => {
                    if (!old) return old;
                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            resData: {
                                ...page.resData,
                                data: page.resData.data.map((user) => user.id === variables.addresseeId ? { ...user, isRequest: true } : user)
                            }
                        }))
                    };
                }
            )
        },
    })
}

export const useCancelRequest = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<null>, Error, string>({
        mutationFn: (id) => FriendAPI.cancelFriendshipRequest(id),

        onSuccess: (_, targetId) => {
            queryClient.invalidateQueries({
                queryKey: ["get-user", targetId],
            });

            queryClient.setQueriesData<InfiniteData<ApiResponse<SuggestionUserResponse>>>(
                {
                    queryKey: ["suggestion-users"],
                    exact: false,
                },
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        pages: old.pages.map((page) => ({
                            ...page,
                            resData: {
                                ...page.resData,
                                data: page.resData.data.map((user) => user.id === targetId ? { ...user, isRequest: false } : user)
                            }
                        }))
                    };
                }
            );
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