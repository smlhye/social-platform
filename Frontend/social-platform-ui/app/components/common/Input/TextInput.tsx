import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
    return (
        <div className="flex flex-col">
            <input
                {...props}
                type="text"
                className="w-full bg-card border border-border px-4 py-2 rounded-md text-sm shadow-xs"
            />
        </div>
    );
};

export default TextInput;