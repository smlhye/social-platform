import { Box, Radio, Switch, TextField } from "@mui/material";
import { SettingsBox } from "../components/SettingsBox";
import { SettingsItem } from "../components/SettingsItem";
import { SettingsGroup } from "../components/SettingsGroup";

export default function Settings() {
    return (
        <Box>
            <SettingsBox
                title="Danh bạ"
                description="Danh sách bạn bè được hiển thị trong danh bạ">
                <SettingsGroup>
                    <SettingsItem
                        title="Hiển thị tất cả mọi người"
                        action={
                            <Radio sx={{ padding: 0, }} defaultChecked />
                        }
                    />
                    <SettingsItem
                        title="Chỉ hiện thị danh sách bạn bè"
                        action={
                            <Radio sx={{ padding: 0, }} />
                        }
                    />
                </SettingsGroup>
            </SettingsBox>

            <SettingsBox title="Ngôn ngữ">
                <SettingsItem
                    title="Thay đổi ngôn ngữ"
                    action={
                        <TextField size="small" />
                    }
                />
            </SettingsBox>

            <SettingsBox title="Ghi nhớ tài khoản">
                <SettingsItem
                    title="Ghi nhớ tài khoản đăng nhập"
                    action={
                        <Switch defaultChecked />
                    }
                />
            </SettingsBox>
        </Box>
    )
}