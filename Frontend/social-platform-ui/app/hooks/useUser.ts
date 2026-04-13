import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { ApiResponse } from "../schemas/common.schema"
import { GetUserIdResponse, SuggestionUserResponse, UpdateUserPayload, UpdateUserResponse } from "../schemas/user.schema"
import { UserAPI } from "../api/user.api"
import { END_POINTS } from "../api/config"

export const useUpdateUser = (id: string) => {
    return useMutation<ApiResponse<UpdateUserResponse>, Error, UpdateUserPayload>({
        mutationFn: (payload) => UserAPI.updateUser(id, payload),
    })
}

export const useSuggestionUsersInfinite = (search?: string, limit = 10) => {
    return useInfiniteQuery<ApiResponse<SuggestionUserResponse>, Error>({
        queryKey: ["suggestion-users", search],

        queryFn: ({ pageParam }) =>
            UserAPI.getSuggestionUsers(search, pageParam as number, limit),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            const page = Number(lastPage.resData.page);
            const total = Number(lastPage.resData.total);
            const limit = Number(lastPage.resData.limit);

            const totalPages = Math.ceil(total / limit);

            return page < totalPages ? page + 1 : undefined;
        },
        placeholderData: (prev) => prev
    });
};

export const useSuggestionUsers = (search?: string, page: number = 1, limit: number = 10) => {
    return useQuery<ApiResponse<SuggestionUserResponse>>({
        queryKey: ['suggestion-user', search, page, limit],
        queryFn: () => {
            console.log("CALL API");
            console.log("URL:", `${END_POINTS.user.suggestion}?search=${search}&page=${page}&limit=${limit}`);
            return UserAPI.getSuggestionUsers(search, page, limit);
        }
    })
}

export const useGetUserById = (id: string) => {
    return useQuery<ApiResponse<GetUserIdResponse>>({
        queryKey: ["get-user", id],
        queryFn: () => UserAPI.getUserById(id),
        enabled: !!id,
    })
}