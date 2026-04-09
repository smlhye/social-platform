import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentUser } from "@/app/hooks/useAuth";
import { useUpdateUser } from "@/app/hooks/useUser";
import {
    UpdateUserPayload,
    UpdateUserSchema
} from "@/app/schemas/user.schema";
import { useFriends } from "../useFriendship";

const formatDate = (date?: string) => {
    if (!date) return "";
    return date.split("T")[0];
};

export const useProfile = () => {
    const [tab, setTab] = useState(0);

    const { data: me, isLoading } = useCurrentUser();
    const updateUser = useUpdateUser(me?.resData.id ?? "");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<UpdateUserPayload>({
        resolver: zodResolver(UpdateUserSchema)
    });

    useEffect(() => {
        if (me?.resData) {
            reset({
                firstName: me.resData.firstName,
                lastName: me.resData.lastName,
                dob: me.resData.dob ? formatDate(me.resData.dob) : "",
                phoneNumber: me.resData.phoneNumber ?? ""
            });
        }
    }, [me, reset]);

    const onSubmit = handleSubmit((payload) => {
        if (!isDirty) {
            alert("Nothing changed!");
            return;
        }

        updateUser.mutate(payload);
    });

    const { data: friendList, isLoading: loadingFriend } = useFriends();

    return {
        tab,
        setTab,
        me: me?.resData,
        isLoading,
        register,
        errors,
        onSubmit,
        friendList,
        loadingFriend
    };
};