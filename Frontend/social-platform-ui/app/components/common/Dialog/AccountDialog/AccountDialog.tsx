"use client";

import { Dialog, DialogContent, Box, Button } from "@mui/material";
import { useState } from "react";
import AccountInfo from "./sections/AccountInfo";

interface AccountDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AccountDialog({ open, onClose }: AccountDialogProps) {
    const [page, setPage] = useState<"a" | "b">("a");

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: '15px'
                }
            }}>
            <DialogContent sx={{ padding: 1 }}>
                {/* CONTAINER */}
                <Box
                    sx={{
                        position: "relative",
                        height: 600,
                        overflow: "hidden",
                    }}
                >
                    {/* PAGE A (cũ) */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            transition:
                                "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            transform:
                                page === "b"
                                    ? "translateX(-30%)"
                                    : "translateX(0%)",
                        }}
                    >
                        <AccountInfo onClick={() => setPage("b")}/>
                    </Box>

                    {/* PAGE B (mới) */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "#bfdbfe", // xanh
                            transition:
                                "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                            transform:
                                page === "b"
                                    ? "translateX(0%)"
                                    : "translateX(100%)",
                            padding: 2,
                        }}
                    >
                        <h3>Page B</h3>
                        <p>Trang mới (màu xanh)</p>
                        <Button
                            variant="outlined"
                            onClick={() => setPage("a")}
                        >
                            Quay lại Page A
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
