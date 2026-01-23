"use client";

import { useEffect, useState } from "react";

const reactions = ["❤️", "👍", "😂", "😮", "🔥", "😍"];

interface Reaction {
    id: number;
    icon: string;
    left: number;
    size: number;
    duration: number;
}

export default function ReactionFloating() {
    const [items, setItems] = useState<Reaction[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newItem: Reaction = {
                id: Date.now(),
                icon: reactions[Math.floor(Math.random() * reactions.length)],
                left: Math.random() * 80 + 10, // %
                size: Math.random() * 16 + 20,
                duration: Math.random() * 1.5 + 2,
            };

            setItems((prev) => [...prev, newItem]);

            // auto remove
            setTimeout(() => {
                setItems((prev) => prev.filter((i) => i.id !== newItem.id));
            }, newItem.duration * 500);
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {items.map((item) => (
                <span
                    key={item.id}
                    className="reaction"
                    style={{
                        left: `${item.left}%`,
                        fontSize: `${item.size}px`,
                        animationDuration: `${item.duration}s`,
                    }}
                >
                    {item.icon}
                </span>
            ))}
        </div>
    );
}
