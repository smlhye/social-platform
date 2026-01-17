import { Avatar } from "@mui/material";

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringToGradient(name: string) {
    const color1 = stringToColor(name);
    const color2 = stringToColor(name + "_gradient");
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}


function stringAvatar(name = "") {
    const parts = name.trim().split(" ").filter(Boolean);

    const first = parts[0]?.[0] ?? "?";
    const second = parts[1]?.[0] ?? "";

    return {
        children: (first + second).toUpperCase(),
        gradient: stringToGradient(name || "default"),
    };
}


interface AvatarUIProps {
    avatar?: string,
    name: string,
    size?: number
}

export default function AvatarUI({ avatar, name, size = 40 }: AvatarUIProps) {

    const avatarData = !avatar ? stringAvatar(name) : null

    return (
        <Avatar
            src={avatar ?? undefined}
            sx={{
                background: avatarData?.gradient,
                width: size,
                height: size,
                fontSize: size * 0.45,
            }}
        >
            {!avatar && avatarData?.children}
        </Avatar>
    )
}