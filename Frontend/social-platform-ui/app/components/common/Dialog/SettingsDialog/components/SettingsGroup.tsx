import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SettingsGroupProps {
    children: ReactNode;
}

export function SettingsGroup({ children }: SettingsGroupProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            {children}
        </Box>
    );
}
