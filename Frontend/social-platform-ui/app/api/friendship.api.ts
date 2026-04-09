import { ApiResponse } from "../schemas/common.schema"
import { FriendListResponse, InboxRequest, InboxRequestList, SendRequestPayload } from "../schemas/friend.schema"
import { apiGateway } from "./apiGateway"
import { END_POINTS } from "./config"

export const FriendAPI = {
    getFriends: () =>
        apiGateway<ApiResponse<FriendListResponse>>(
            END_POINTS.friendship.base,
            {
                method: "GET"
            }
        ),

    sendFriendshipRequest: (payload: SendRequestPayload) =>
        apiGateway<ApiResponse<null>>(
            END_POINTS.friendship.base,
            {
                method: "POST",
                data: payload
            }
        ),

    cancelFriendshipRequest: (targetId: string) =>
        apiGateway<ApiResponse<null>>(
            `${END_POINTS.friendship.base}/request/${targetId}`,
            {
                method: "DELETE"
            }
        ),

    getInboxRequest: () =>
        apiGateway<ApiResponse<InboxRequestList>>(
            END_POINTS.friendship.requester,
            {
                method: "GET"
            }
        ),

    acceptRequest: (requestId: string) =>
        apiGateway<ApiResponse<null>>(
            `${END_POINTS.friendship.base}/${requestId}/accept`,
            {
                method: "PATCH",
            }
        ),

    declineRequest: (requestId: string) =>
        apiGateway<ApiResponse<null>>(
            `${END_POINTS.friendship.base}/${requestId}/decline`,
            {
                method: "DELETE"
            }
        ),
}