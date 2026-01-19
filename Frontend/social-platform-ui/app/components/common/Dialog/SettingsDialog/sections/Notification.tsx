import { Box, Switch } from "@mui/material";
import { SettingsBox } from "../components/SettingsBox";
import { SettingsItem } from "../components/SettingsItem";

export default function Notification() {
    return (
        <Box>
            <SettingsBox
                title="Cài đặt thông báo"
                description="Nhận được thông báo mỗi khi có tin nhắn mới">
                <SettingsItem title="Hiển thị thông báo"
                    action={<Switch />} />
            </SettingsBox>
        </Box>
    )
}