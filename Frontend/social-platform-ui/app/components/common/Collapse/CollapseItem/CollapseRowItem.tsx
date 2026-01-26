import { Box, Stack } from "@mui/material";

interface CollapseRowItemProps {
    icon: React.ReactNode,
    title: string,
    subTitle: string,
    date: string,
    type: string
}

export default function CollapseRowItem({ icon, title, subTitle, date, type }: CollapseRowItemProps) {
    return (
        <Box className="flex w-full border-1 border-border p-2">
            <Box
                width="var(--sidebar-length)"
                height="var(--sidebar-length)"
                className="flex justify-center items-center"
            >
                <span className="text-2xl">{icon}</span>
            </Box>
            <Stack direction="column" className="gap-1">
                <span className="font-semibold text-foreground">{title}</span>
                <span>{date}</span>
            </Stack>
        </Box>
    )
}