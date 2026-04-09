import z from "zod";

export interface SignInTokens {
    accessToken: string;
    refreshToken: string | null;
}

export interface SignInResponse {
    tokens: SignInTokens;
}

export const signinSchema = z.object({
    username: z.string().min(1, "auth.usernameRequired"),
    password: z.string().min(6, "auth.passwordRequired"),
    rememberMe: z.boolean().optional(),
})
export type SignInSchema = z.infer<typeof signinSchema>;

export const signUpRes = z.object({
    fullName: z.string(),
    username: z.string()
})
export type SignUpRes = z.infer<typeof signUpRes>;

export const signUpSchema = z.object({
    firstName: z.string().min(2, "Firstname is required"),
    lastName: z.string().min(2, "Lastname is required"),
    username: z.string().min(2, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required")
}).refine((data) => data.confirmPassword === data.password, {
    message: "Password is not match",
    path: ["confirmPassword"]
})
export type SignUpSchema = z.infer<typeof signUpSchema>;


export const GetMeSchema = z.object({
    id: z.string().uuid(),
    avatar: z.string(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string().nullable(),
    email: z.string().email().nullable(),
    phoneNumber: z.string().nullable()
})
export type GetMeResponse = z.infer<typeof GetMeSchema>;

export const ForgotPasswordSchema = z.object({
    email: z.string(),
})
export type ForgotPasswordReq = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
    email: z.string().email("Email invalid!"),
    otp: z.string().length(6, "OTP must at 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Password must be string")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"]
})
export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;