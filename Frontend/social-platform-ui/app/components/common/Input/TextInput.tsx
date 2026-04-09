import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    error?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ iconLeft, iconRight, error, className, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="relative flex flex-col">
                {iconLeft && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                        {iconLeft}
                    </span>
                )}
                <input
                    ref={ref}
                    {...props}
                    className={`w-full bg-card border border-border px-4 py-2 rounded-md text-sm shadow-xs ${className} ${iconLeft ? "pl-9" : ""} ${iconRight ? "pr-9" : ""}`}
                />
                {iconRight && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer">
                        {iconRight}
                    </span>
                )}
            </div>
            {error && (
                <p className="text-xs text-chat-warning ml-1">
                    {error}
                </p>
            )}
        </div>
    );
}
);

export default TextInput;