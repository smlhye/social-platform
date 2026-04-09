import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../api/auth.api";
import { ForgotPasswordReq, GetMeResponse, ResetPasswordPayload, SignInResponse, SignInSchema, SignUpRes, SignUpSchema } from "../schemas/auth.schema";
import { ApiResponse } from "../schemas/common.schema";

export const useSignIn = () => {
    return useMutation<ApiResponse<SignInResponse>, Error, SignInSchema>({
        mutationFn: AuthAPI.signIn,
    });
};

export const useSignUp = () => {
    return useMutation<ApiResponse<SignUpRes>, Error, SignUpSchema>({
        mutationFn: AuthAPI.signUp
    })
}

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

export const useForgotPassword = () => {
    return useMutation<ApiResponse<null>, Error, ForgotPasswordReq>({
        mutationFn: AuthAPI.forgotPassword,
    })
}

export const useResetPassword = () => {
    return useMutation<ApiResponse<null>, Error, ResetPasswordPayload>({
        mutationFn: AuthAPI.resetPassword,
    })
}