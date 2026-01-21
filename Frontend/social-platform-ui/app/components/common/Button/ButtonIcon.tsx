interface ButtonIconProps {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function ButtonIcon({
    icon,
    children,
    onClick,
    className = "",
    type = "button",
}: ButtonIconProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
        inline-flex items-center gap-1
        px-3 py-1
        rounded-xl
        text-sm font-semibold
        bg-primary text-primary-foreground
        cursor-pointer
        transition
        ${className}
      `}
        >
            <span className="text-lg">{icon}</span>
            <span>{children}</span>
        </button>
    );
}
