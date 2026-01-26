"use client";

import { Box } from "@mui/material";

interface ImageItem {
    id: number;
    url: string;
}

const images: ImageItem[] = [
    { id: 1, url: "/aurorabackground.jpg" },
    { id: 2, url: "/otisadminbg.jpeg" },
    { id: 3, url: "/aurorabackground.jpg" },
    { id: 4, url: "/aurorabackground.jpg" },
    { id: 5, url: "/aurorabackground.jpg" },
    { id: 6, url: "/aurorabackground.jpg" },
    { id: 7, url: "/aurorabackground.jpg" },
    { id: 8, url: "/aurorabackground.jpg" },
];

export default function CollapseImageItem() {
    return (
        <Box className="grid grid-cols-4 gap-2">
            {images.map((img) => (
                <Box
                    key={img.id}
                    className="aspect-square overflow-hidden rounded-sm"
                >
                    <img
                        src={img.url}
                        alt=""
                        className="h-full w-full object-cover cursor-pointer"
                    />
                </Box>
            ))}
        </Box>
    );
}
