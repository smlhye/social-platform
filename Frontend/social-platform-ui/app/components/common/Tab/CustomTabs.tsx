"use client"
import { styled, Tabs, Tab } from "@mui/material";

const CustomTabs = styled(Tabs)(({ theme }) => ({
    minHeight: 40,
    borderBottom: `1px solid ${theme.palette.divider}`,

    "& .MuiTabs-indicator": {
        height: 2,
        borderRadius: 2,
        backgroundColor: "hsl(var(--sub-foreground))",
    },
}));

export default CustomTabs;