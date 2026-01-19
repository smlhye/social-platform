import { Switch, Radio, RadioGroup, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import { SettingsBox } from "../components/SettingsBox";
import { SettingsItem } from "../components/SettingsItem";
import { SettingsGroup } from "../components/SettingsGroup";
import { IoIosArrowForward } from "react-icons/io";

export function Authentication() {
    return (
        <SettingsBox title="Mật khẩu đăng nhập">
            <SettingsItem
                title="Đổi mật khẩu"
                action={
                    <IconButton><IoIosArrowForward className="text-foreground" /></IconButton>
                }
            />
        </SettingsBox>
    );
}
