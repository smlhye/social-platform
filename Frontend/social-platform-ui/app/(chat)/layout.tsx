import { cookies } from "next/headers";
import { Sidebar } from "../components/layout/Sidebar";
import { redirect } from "next/navigation";

export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("ACCESS_TOKEN");

    if (!accessToken) {
        redirect("/sign-in");
    }

    return (
        <div className="flex h-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}