'use client';

import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface DropdownMenuItemProps {
    icon?: ReactNode;
    title: string;
    onClick?: () => void;
}

export default function DropdownMenuItem({
    icon,
    title,
    onClick,
}: DropdownMenuItemProps) {
    return (
        <Box
            onClick={onClick}
            className="
                flex items-center w-full
                px-3 py-2
                text-base cursor-pointer
                hover:bg-muted transition
                select-none
                bg-sub-background
                rounded-md
            "
        >
            {/* Icon box */}
            <Box
                className="flex items-center justify-center text-base gap-1 text-foreground"
            >
                {icon}
                {title}
            </Box>
        </Box>
    );
}
