import z from "zod";

export const signinSchema = z.object({
    username: z.string().min(1, "auth.usernameRequired"),
    password: z.string().min(6, "auth.passwordRequired")
})

export type SignInSchema = z.infer<typeof signinSchema>;