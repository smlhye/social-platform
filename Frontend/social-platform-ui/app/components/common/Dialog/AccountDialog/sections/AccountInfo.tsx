"use client"
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { AvatarUI } from "../../../Avatar";
import { ButtonIcon } from "../../../Button";
import { MdPersonAddAlt } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { FormInput } from "@/app/components/chat/ChatInput";
import InformationItem from "../components/InfomationItem";
import { CustomSwitch } from "../../../ThemeSwitch";
import { useState } from "react";
import CustomTabs from "../../../Tab/CustomTabs";
import { CustomTab } from "../../../Tab";
import { CgProfile } from "react-icons/cg";

interface AccountInfoProps {
    onClick: () => void
}

export default function AccountInfo({ onClick }: AccountInfoProps) {
    const [tab, setTab] = useState(0);

    return (
        <Stack direction="column" className="w-full gap-3">
            <Box className="relative w-full h-[150px] rounded-mes">
                <Image src={"/aurorabackground.jpg"} alt="" fill className="object-cover rounded-md" />
            </Box>
            <Box className="relative w-full">
                <Box className="absolute -top-12 left-5">
                    <AvatarUI name="Nguyễn Văn An" size={80} />
                </Box>
                <Stack direction="column" className="px-5">
                    <Stack direction="row" className="justify-end gap-2">
                        <ButtonIcon
                            onClick={onClick}
                            icon={<MdPersonAddAlt />}
                            className="bg-transparent border-2 border-second-border text-secondary-foreground">
                            Add Friend
                        </ButtonIcon>
                        <ButtonIcon
                            icon={<MdOutlineReportGmailerrorred />}
                            className="bg-transparent border-3 border-second-border text-secondary-foreground">
                            Report
                        </ButtonIcon>
                    </Stack>
                    <Box className="mt-2">
                        <span className="text-lg font-semibold">Hồ Đông Huy</span>
                        <Stack className="mt-2">
                            <div className={`flex items-center gap-2 text-sm`}>
                                <span className="flex items-center justify-center text-base relative top-[1px]">
                                    <MdOutlineMail />
                                </span>
                                <span className="truncate">huynguyennhonhai@gmail.com</span>
                            </div>
                        </Stack>
                    </Box>
                    <CustomTabs value={tab} onChange={(_, v) => setTab(v)}>
                        <CustomTab label="Profile" icon={<CgProfile />} iconPosition="start" />
                        <CustomTab label="Security" />
                        <CustomTab label="About" />
                    </CustomTabs>
                    {tab === 0 && (
                        <Stack direction="column" className="mt-3 gap-3">
                            <InformationItem title="FullName" >
                                <FormInput width={"50%"} onChange={(e) => e.target.value} value={"Hồ Đông"} />
                                <FormInput width={"50%"} onChange={(e) => e.target.value} value={"Huy"} />
                            </InformationItem>
                            <InformationItem title="Email" >
                                <FormInput onChange={(e) => e.target.value} value={"huynguyennhonhai@gmail.com"} />
                            </InformationItem>
                            <InformationItem title="Notification" >
                                <CustomSwitch />
                            </InformationItem>
                        </Stack>
                    )}

                </Stack>
            </Box>
        </Stack>
    )
}