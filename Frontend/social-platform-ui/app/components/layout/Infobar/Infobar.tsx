import { Box } from "@mui/material";
import ChatCollapse from "../../common/Collapse/ChatCollapse";
import { AvatarUI } from "../../common/Avatar";
import CollapseRowItem from "../../common/Collapse/CollapseItem/CollapseRowItem";
import { FaFilePdf } from "react-icons/fa6";
import CollapseImageItem from "../../common/Collapse/CollapseItem/CollapseImageItem";
import { MdOutlineImage } from "react-icons/md";
import { MdOutlineFileCopy } from "react-icons/md";
import { MdInsertLink } from "react-icons/md";
import { useI18n } from "@/app/lib/i18nContext";

export default function Infobar() {

    const { t } = useI18n();

    return (
        <Box
            className="h-full p-3 flex flex-col items-center overflow-y-auto min-h-0 pr-[16px]"
        >
            {/* KÉO CONTENT PHỦ LẠI */}
            <Box className="-mr-[16px] w-full flex flex-col items-center">
                <span className="text-xl font-semibold">{t("chat.contactInfo")}</span>

                <Box className="py-6 flex flex-col justify-center items-center gap-3">
                    <AvatarUI avatar="" name="Hồ Đông Huy" size={70} />
                    <span className="font-semibold">Hồ Đông Huy</span>
                </Box>

                <Box className="w-full">
                    <ChatCollapse icon={<MdOutlineImage />} title={t("chat.image")} defaultOpen>
                        <CollapseImageItem />
                    </ChatCollapse>

                    <ChatCollapse icon={<MdOutlineFileCopy />} title={t("chat.file")} defaultOpen>
                        <CollapseRowItem icon={<FaFilePdf />} title="HoDongHuy.pdf" subTitle="522.64 KB" date="20/01/2026" type="" />
                        <CollapseRowItem icon={<FaFilePdf />} title="HoDongHuy.pdf" subTitle="522.64 KB" date="20/01/2026" type="" />
                    </ChatCollapse>

                    <ChatCollapse icon={<MdInsertLink />} title={t("chat.link")} defaultOpen>
                        <CollapseRowItem icon={<FaFilePdf />} title="HoDongHuy.pdf" subTitle="522.64 KB" date="20/01/2026" type="" />
                    </ChatCollapse>
                </Box>
            </Box>
        </Box>
    );
}
