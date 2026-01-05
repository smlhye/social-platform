import { Box, IconButton, TextField } from "@mui/material";
import { IoIosAttach } from "react-icons/io";
import { TiMicrophoneOutline } from "react-icons/ti";
import { BsSend } from "react-icons/bs";

export default function ChatInput() {
    return (
        <Box className="w-full flex justify-between items-center bg-secondary rounded-xl px-3">
            <IconButton className="!text-secondary-foreground">
                <IoIosAttach />
            </IconButton>
            <TextField
                placeholder="Nhập tin nhắn"
                className="w-full"
                sx={{
                    "& .MuiOutlinedInput-input": {
                        color: "var(--secondary-foreground)", // màu chữ nhập
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                        color: "var(--muted-foreground)", // màu placeholder nhẹ
                        opacity: 1, // để màu hiển thị đúng
                    },

                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        "&.Mui-focused fieldset": { border: "none" }
                    }
                }}
            />
            <IconButton className="!text-secondary-foreground">
                <TiMicrophoneOutline />
            </IconButton>
            <IconButton className="!text-secondary-foreground">
                <BsSend />
            </IconButton>
        </Box>
    )
}