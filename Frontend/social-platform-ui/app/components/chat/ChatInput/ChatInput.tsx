"use client";

import { Box, IconButton, InputBase, Tooltip } from "@mui/material";
import {
    BsEmojiSmile,
    BsImage,
    BsPaperclip,
    BsPersonPlus,
    BsLightning,
    BsThreeDots,
    BsHandThumbsUp,
    BsSend,
} from "react-icons/bs";
import { MdOutlineDraw } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/app/lib/i18nContext";

export default function ChatInput() {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const { t } = useI18n();

    // Auto focus khi mở chat
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSend = () => {
        if (!value.trim()) return;
        console.log("Send:", value);
        setValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box>
            {/* 🔹 TOOLBAR */}
            <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                <ToolbarIcon label="Emoji"><BsEmojiSmile /></ToolbarIcon>
                <ToolbarIcon label="Ảnh"><BsImage /></ToolbarIcon>
                <ToolbarIcon label="Đính kèm"><BsPaperclip /></ToolbarIcon>
                <ToolbarIcon label="Mention"><BsPersonPlus /></ToolbarIcon>
                <ToolbarIcon label="Vẽ"><MdOutlineDraw /></ToolbarIcon>
                <ToolbarIcon label="Shortcut"><BsLightning /></ToolbarIcon>
                <ToolbarIcon label="Thêm"><BsThreeDots /></ToolbarIcon>
            </Box>

            {/* 🔹 INPUT ROW */}
            <Box display="flex" alignItems="center">
                <InputBase
                    inputRef={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("chat.placeholder")}
                    multiline
                    maxRows={4}
                    sx={{
                        flex: 1,
                        fontSize: 15,
                        px: 1,
                        py: 0.5,
                        color: "hsl(var(--foreground))",
                        "& textarea": {
                            resize: "none",
                            lineHeight: "25px",
                        },
                        "& textarea::placeholder": {
                            color: "hsl(var(--foreground))",
                            opacity: 1,
                        },
                    }}
                />

                <Box display="flex" alignItems="center" gap={0.5}>
                    <ToolbarIcon label="Emoji"><BsEmojiSmile /></ToolbarIcon>

                    {value.trim() ? (
                        <ToolbarIcon label="Gửi" onClick={handleSend}>
                            <BsSend />
                        </ToolbarIcon>
                    ) : (
                        <ToolbarIcon label="Thích">
                            <BsHandThumbsUp />
                        </ToolbarIcon>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

/* 🔸 TOOLBAR ICON */
function ToolbarIcon({
    children,
    label,
    onClick,
}: {
    children: React.ReactNode;
    label: string;
    onClick?: () => void;
}) {
    return (
        <Tooltip title={label}>
            <IconButton
                size="small"
                onClick={onClick}
                sx={{
                    color: "hsl(var(--foreground))",
                    "&:hover": {
                        bgcolor: "action.hover",
                        color: "text.primary",
                    },
                }}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
}
