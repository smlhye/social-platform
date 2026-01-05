import { Box, Skeleton, Stack } from "@mui/material";

export default function FriendLabelLoading() {
    return (
        // <Box className="w-100 h-[72px] p-1.5 flex">
        //     <Skeleton variant="circular" width={40} height={40} />
        //     <Stack className="flex-1 flex-col">
        //         <Skeleton variant="rectangular" width={"100%"} height={20} />
        //         <Skeleton variant="rectangular" width={"60%"} height={20} />
        //     </Stack>
        // </Box>
        <Box className="w-full flex items-center" padding={1.5} gap={1.5}>
            <Skeleton variant="circular" animation="wave" width={40} height={40} />
            <Stack direction="column" className="flex-1 min-w-0" spacing={1}>
                <Box width="100%">
                    <Skeleton variant="rounded" animation="wave" height={15} />
                </Box>
                <Box width="60%">
                    <Skeleton variant="rounded" animation="wave" height={15} />
                </Box>
            </Stack>
        </Box>
    )
}