import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput: React.FC<TextInputProps> = ({ ...props }) => {
    return (
        <div className="flex flex-col">
            <input
                {...props}
                type="password"
                className="w-full border border-border px-4 py-2 rounded-md text-sm shadow-xs"
            />
        </div>
    );
};

export default PasswordInput;