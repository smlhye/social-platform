import { ButtonHTMLAttributes } from "react";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string
}

export default function ButtonSubmit({ value, ...props }: ButtonSubmitProps) {
    return (
        <button
            {...props}
            type="submit"
            className="w-full rounded-md px-4 py-2 text-sm text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-medium disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
            {value}
        </button>
    );
}