import { styled, Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 24,
    padding: 0,

    "& .MuiSwitch-switchBase": {
        padding: 2,
        transition: "300ms",

        "&.Mui-checked": {
            transform: "translateX(18px)",
            color: "#fff",

            "& + .MuiSwitch-track": {
                backgroundColor: "#1d7ef7", // xanh giống hình
                opacity: 1,
            },
        },
    },

    "& .MuiSwitch-thumb": {
        width: 20,
        height: 20,
        backgroundColor: "#fff",
        boxShadow: 'none'
    },

    "& .MuiSwitch-track": {
        borderRadius: 24,
        backgroundColor: "hsl(var(--second-border))", // xám đậm khi OFF
        opacity: 1,
        transition: "background-color 300ms",
    },
}));

export default CustomSwitch;