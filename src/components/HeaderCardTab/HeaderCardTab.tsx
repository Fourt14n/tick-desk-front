import { useTabs } from "@/store/TabsStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

export default function HeaderCardTab({ tabUrl }: { tabUrl: string }) {
    const navigate = useNavigate();
    const deleteTab = useTabs(state => state.deleteTab);

    return (
        <div className="relative hidden md:flex">
            {tabUrl !== "/Home" && <X size={16} className={`absolute right-1 top-1 cursor-pointer hover:scale-125 transition-all`} onClick={() => deleteTab(tabUrl)}/>}
            <div className={`flex h-full bg-(--bg-divs) px-10 border-r-1 border-[#BAB9B9] cursor-pointer`} onClick={() => navigate(tabUrl)}>
                <div className={`flex justify-center items-center w-full`}>
                    {tabUrl !== "/Home" ? `Ticket: ${tabUrl.split("/").at(-1)?.padStart(5, "0")}` : tabUrl.replace("/", "")}
                </div>
                <p className="flex "></p>
            </div>
        </div>
    )
}