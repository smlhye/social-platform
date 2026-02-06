import { SignInResponse, SignInSchema } from "../schemas/auth.schema";
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

    signOut: () => apiGateway<ApiResponse<null>>(
        END_POINTS.auth.signOut,
        {
            method: "POST"
        }
    ),
}