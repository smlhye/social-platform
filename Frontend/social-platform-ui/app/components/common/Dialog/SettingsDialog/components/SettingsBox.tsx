import { SpaTwoTone } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SettingsSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

export function SettingsBox({ title, description, children }: SettingsSectionProps) {
    return (
        <Box className="flex flex-col mb-6">
            <Box className="flex flex-col gap-2 ml-3 mb-3">
                {title && (
                    <span className="font-semibold text-sm">
                        {title}
                    </span>
                )}
                {description && (
                    <span className="text-xs">{description}</span>
                )}
            </Box>
            <Box className="flex-col bg-sub-background rounded-md px-4 py-2">
                {children}
            </Box>
        </Box>
    );
}
