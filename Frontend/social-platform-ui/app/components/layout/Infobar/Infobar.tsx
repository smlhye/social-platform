import { Box } from "@mui/material";

export default function Infobar() {
    return (
        <Box
            className="h-full p-3 border-l border-gray-200 flex flex-col items-center"
        >
            <span className="text-xl font-semibold">Thông tin liên hệ</span>
        </Box>
    )
}