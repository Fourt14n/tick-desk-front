import { ChartBarLabel } from "@/components/LineChart/LineChart";
import { ChartPieDonutActive } from "@/components/PizzaChart/PizzaChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Ticket } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="flex h-full w-full">
            <ScrollArea className="w-full h-full flex p-5">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col justify-center">
                            <p className="text-(--text-strongGreen) font-bold">Relatório</p>
                            <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex gap-5 border-1 p-5 flex-1 justify-center md:justify-between items-center rounded-2xl">
                                <div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-light">Total de chamados</p>
                                        <p className="text-2xl font-bold">1.231</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-[#F5F5F5] rounded-3xl">
                                        <Ticket />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 border-1 p-5 flex-1 justify-center md:justify-between items-center rounded-2xl">
                                <div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-light">Total de pendentes</p>
                                        <p className="text-2xl font-bold">1.231</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-[#F5F5F5] rounded-3xl">
                                        <Clock color="orange" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-5 border-1 p-5 flex-1 justify-center md:justify-between items-center rounded-2xl">
                                <div>
                                    <div className="flex flex-col gap-3">
                                        <p className="font-light">Total de resolvidos</p>
                                        <p className="text-2xl font-bold">1.231</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="p-3 bg-[#F5F5F5] rounded-3xl">
                                        <Check color="green" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 w-full md:flex-row">
                            <div className="w-full md:w-1/2">
                                <ChartBarLabel />
                            </div>
                            <div className="w-full md:w-1/2">
                                <ChartPieDonutActive />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}