import React, { InputHTMLAttributes, ReactNode, useState } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({ iconLeft, iconRight, ...props }) => {
    return (
        <div className="relative flex flex-col">
            {iconLeft && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                    {iconLeft}
                </span>
            )}
            <input
                {...props}
                className={`w-full bg-card border border-border px-4 py-2 rounded-md text-sm shadow-xs ${iconLeft ? "pl-9" : ""} ${iconRight ? "pr-9" : ""}`}
            />
            {iconRight && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
                    {iconRight}
                </span>
            )}
        </div>
    );
};

export default TextInput;