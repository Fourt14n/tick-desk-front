import { ChartNoAxesCombined, Home, Plus, Search, Users, WalletCards } from "lucide-react";
import { useState } from "react"
import { Input } from "../ui/input";
import { useTabs } from "@/store/TabsStore";
import HeaderCardTab from "../HeaderCardTab/HeaderCardTab";



export default function FixedLayout() {
    
  const tabs = useTabs((state) => state.tabs);


    return (
        <div className="flex">
            <div className="w-12 h-dvh bg-[#9AFFC0] flex flex-col gap-4">
                <div className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                    <Home/>
                </div>
                <div className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                    <WalletCards />
                </div>
                <div className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                    <Users />
                </div>
                <div className="flex justify-center items-center h-12 cursor-pointer hover:bg-white hover:rounded-full">
                    <ChartNoAxesCombined />
                </div>
            </div>

            <div className="flex flex-1 w-full bg-(--bg-default) h-12">
                <div className="flex justify-between items-center w-full">
                    <div className="flex h-full">
                        <div className="bg-[#D0E2D0] flex justify-center items-center h-full w-12 cursor-pointer">
                            <Plus />
                        </div>

                        {
                            tabs.map((tab) => {
                                console.log(tab);
                                return (
                                    <HeaderCardTab tabUrl={tab}/>
                                )
                            })
                        }
                    </div>

                    <div className="relative w-1/6 mr-2">
                        <Input placeholder="Localize seu ticket" className="bg-white pr-8 w-full" />
                        <Search size={20} className="absolute top-2 right-2 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}