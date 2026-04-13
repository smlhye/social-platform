import z from "zod";


export const SimpleUserSchema = z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    avatar: z.string().optional(),
    isRequest: z.boolean(),
    isAddress: z.boolean()
})
export const SuggestionUserSchema = z.object({
    data: z.array(SimpleUserSchema),
    total: z.number().optional(),
    page: z.number().optional(),
    limit: z.number().optional()
});
export type SuggestionUserResponse = z.infer<typeof SuggestionUserSchema>;


export const UpdateUserSchema = z.object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    dob: z
        .string()
        .optional(),

    gender: z
        .enum(["MALE", "FEMALE", "OTHER"]) // sửa theo enum của m
        .optional(),

    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(20, "Phone number must be at most 20 digits")
        .optional(),
})

export const UpdateUserResponseSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    phoneNumber: z.string().optional(),
});

export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>;


export const GetUserByIdSchema = z.object({
    id: z.string().uuid(),
    avatarURL: z.string(),
    fullName: z.string(),
    dob: z.string(),
    gender: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    lastSeen: z.string().optional(),
    isFriend: z.boolean(),
    isRequest: z.boolean(),
    isAddress: z.boolean()
})
export type GetUserIdResponse = z.infer<typeof GetUserByIdSchema>;

// id: user.id,
//             avatarURL: user.avatarURL,
//             fullName: user.firstName + user.lastName,
//             dob: user.dob ? new Date(user.dob) : undefined,
//             gender: user.gender,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             isFriend: !!isFriend,
//             isRequest: !!isRequest,
//             isAddress: !!isAddress