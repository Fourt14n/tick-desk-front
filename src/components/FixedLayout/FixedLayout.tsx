import { ChartNoAxesCombined, Home, Plus, Search, Users, WalletCards } from "lucide-react";
import { type JSX } from "react"
import { Input } from "../ui/input";
import { useTabs } from "@/store/TabsStore";
import HeaderCardTab from "../HeaderCardTab/HeaderCardTab";
import { showError } from "@/hooks/useToast";
import { useNavigate } from "react-router";

const API_URL = "";

function returnNextTicketNum() {
    try {
        fetch(API_URL)
            .then(res => res.json())
            .then((data) => data)
    } catch (error) {
        showError(error);
    }
}

export default function FixedLayout({ TelaAtual }: { TelaAtual: JSX.Element }) {
    const navigate = useNavigate();
    const tabs = useTabs((state) => state.tabs);

    return (
        <div>
            <div className="flex">
                <div className="w-12 h-dvh bg-[#9AFFC0] flex flex-col gap-4">
                    <div onClick={() => navigate("/Home")} className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                        <Home />
                    </div>
                    <div onClick={() => navigate("/Tickets/")} className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                        <WalletCards />
                    </div>
                    <div onClick={() => navigate("/Users/")} className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                        <Users />
                    </div>
                    <div onClick={() => navigate("/Dashboards/")} className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                        <ChartNoAxesCombined />
                    </div>
                </div>

                <div className="w-full h-dvh">

                    <header className="flex flex-1 w-full bg-(--bg-default) h-12">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex h-full">
                                <div onClick={() => navigate("/Ticket/Criar")} className="bg-[#D0E2D0] flex justify-center items-center h-full w-12 cursor-pointer">
                                    <Plus />
                                </div>
                                <div className="flex overflow-x-scroll lg:overflow-auto max-w-10/12 lg:max-w-full">
                                    {
                                        tabs.map((tab) => {
                                            console.log(tab);
                                            return (
                                                <HeaderCardTab tabUrl={tab} />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="relative w-3/4 md:w-2/5 mr-2 lg:w-1/3">
                                <Input placeholder="Localize seu ticket" className="bg-white pr-8 w-full" />
                                <Search size={20} className="absolute top-2 right-2 cursor-pointer" />
                            </div>
                        </div>
                    </header>


                    <div className="w-full h-(--height-default)">
                        {TelaAtual}
                    </div>

                </div>


            </div>
        </div>

    )
}