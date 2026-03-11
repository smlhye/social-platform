import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../api/auth.api";
import { GetMeResponse, SignInResponse, SignInSchema } from "../schemas/auth.schema";
import { ApiResponse } from "../schemas/common.schema";

export const useSignIn = () => {
    return useMutation<ApiResponse<SignInResponse>, Error, SignInSchema>({
        mutationFn: AuthAPI.signIn,
    });
};

export const useSignOut = () => {
    return useMutation<ApiResponse<null>, Error>({
        mutationFn: AuthAPI.signOut,
    });
};

export const useCurrentUser = () => {
    return useQuery<ApiResponse<GetMeResponse>>({
        queryKey: ["me"],
        queryFn: () => AuthAPI.getMe()
    });
};