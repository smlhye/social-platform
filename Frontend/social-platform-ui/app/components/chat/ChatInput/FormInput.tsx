import React from "react";

interface InputBaseProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function InputBase({
    className = "",
    ...props
}: InputBaseProps) {
    return (
        <input
            {...props}
            className={`
                w-full
                px-3 py-1
                text-sm
                rounded-lg
                border-3 border-second-border
                bg-background
                text-foreground
                placeholder:text-muted-foreground
                focus:outline-none
                focus:ring-2
                transition
                ${className}
            `}
        />
    );
}
