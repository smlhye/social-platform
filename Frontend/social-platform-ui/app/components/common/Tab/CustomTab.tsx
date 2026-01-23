import { styled, Tab } from "@mui/material";

const CustomTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    minHeight: 40,
    padding: "6px 12px",
    fontSize: 14,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    gap: 0,

    "& .MuiTab-iconWrapper": {
        marginBottom: 0,
        fontSize: 16,
    },

    "&.Mui-selected": {
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
}));

export default CustomTab;