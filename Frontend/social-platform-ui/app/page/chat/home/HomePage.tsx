import { ReactionFloating } from "@/app/components/chat/ReactionFloating";
import { Box } from "@mui/material";

export default function HomePage() {
    return (
        <Box className="relative w-full h-full">
            <Box className="w-[50%] z-2 h-full flex flex-col justify-center p-6">
                <span className="text-7xl">Chào mừng bạn đến với chúng tôi</span>
                <span className="text-md mt-4">Nền tảng nhắn tin dành cho mọi kết nối của bạn.
                    Trò chuyện nhanh chóng, bảo mật và liền mạch, giúp bạn luôn giữ liên lạc
                    với bạn bè, gia đình và những người quan trọng — mọi lúc, mọi nơi.</span>
            </Box>
            <Box
                className="absolute top-0 right-0 h-full w-[60%] pl-2"
                style={{
                    background: `
                        linear-gradient(135deg,
                          hsl(225.4 80% 54%),
                          hsl(225.4 70% 70%)
                        )
                    `,

                    clipPath: "ellipse(80% 100% at 100% 50%)",
                }}
            >
                <ReactionFloating />
            </Box>
        </Box>
    )
}