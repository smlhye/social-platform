import { ForgotPasswordReq, ForgotPasswordSchema, GetMeResponse, ResetPasswordPayload, SignInResponse, SignInSchema, SignUpRes, SignUpSchema } from "../schemas/auth.schema";
import { ApiResponse } from "../schemas/common.schema";
import { apiGateway } from "./apiGateway";
import { END_POINTS } from "./config";

export const AuthAPI = {
    signIn: (payload: SignInSchema) => apiGateway<ApiResponse<SignInResponse>, SignInSchema>(
        END_POINTS.auth.signIn,
        {
            method: "POST",
            data: payload
        }
    ),

    signUp: (payload: SignUpSchema) => apiGateway<ApiResponse<SignUpRes>, SignInSchema>(
        END_POINTS.auth.signUp,
        {
            method: "POST",
            data: payload
        }
    ),

    signOut: () => apiGateway<ApiResponse<null>>(
        END_POINTS.auth.signOut,
        {
            method: "POST"
        }
    ),

    getMe: () => apiGateway<ApiResponse<GetMeResponse>>(
        END_POINTS.auth.getMe,
        {
            method: "GET"
        }
    ),

    forgotPassword: (payload: ForgotPasswordReq) => apiGateway<ApiResponse<null>, ForgotPasswordReq>(
        END_POINTS.auth.forgotPassword,
        {
            method: "POST",
            data: payload
        }
    ),

    resetPassword: (payload: ResetPasswordPayload) => apiGateway<ApiResponse<null>, ResetPasswordPayload>(
        END_POINTS.auth.resetPassword,
        {
            method: "POST",
            data: payload
        }
    )
}
