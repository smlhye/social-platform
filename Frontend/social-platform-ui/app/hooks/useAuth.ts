import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../api/auth.api";
import { SignInResponse, SignInSchema } from "../schemas/auth.schema";
import { ApiResponse } from "../schemas/common.schema";

export const useSignIn = () => {
    return useMutation<ApiResponse<SignInResponse>, Error, SignInSchema>({
        mutationFn: AuthAPI.signIn,
    });
};
