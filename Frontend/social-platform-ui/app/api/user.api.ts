import { ApiResponse } from "../schemas/common.schema";
import { GetUserIdResponse, SuggestionUserResponse, UpdateUserPayload, UpdateUserResponse } from "../schemas/user.schema";
import { apiGateway } from "./apiGateway";
import { END_POINTS } from "./config";

export const UserAPI = {
    updateUser: (id: string, payload: UpdateUserPayload) =>
        apiGateway<ApiResponse<UpdateUserResponse>, UpdateUserPayload>(
            `${END_POINTS.user.base}/${id}`,
            {
                method: "PATCH",
                data: payload
            }
        ),

    getSuggestionUsers: (search?: string, page: number = 1, limit: number = 1) =>
        apiGateway<ApiResponse<SuggestionUserResponse>>(
            `${END_POINTS.user.suggestion}?${search ? `search=${search}` : ""}&page=${page}&limit=${limit}`,
            {
                method: "GET"
            }
        ),

    getUserById: (id: string) =>
        apiGateway<ApiResponse<GetUserIdResponse>>(
            `${END_POINTS.user.base}/${id}`,
            {
                method: "GET"
            }
        ),
}