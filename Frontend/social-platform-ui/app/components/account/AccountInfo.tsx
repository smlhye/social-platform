import { Dialog } from "@mui/material";

interface AccountInfoProps {
    open: boolean,
    onClose: () => void
}

export default function AccountInfo({ open, onClose }: AccountInfoProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            Xin chào
        </Dialog>
    )
}