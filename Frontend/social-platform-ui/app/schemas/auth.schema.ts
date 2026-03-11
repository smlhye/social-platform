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

export const GetMeSchema = z.object({
    id: z.string().uuid(),
    username: z.string(),
    fullName: z.string(),
    dob: z.string().nullable(),
    email: z.string().email().nullable(),
    phoneNumber: z.string().nullable()
})
export type GetMeResponse = z.infer<typeof GetMeSchema>;