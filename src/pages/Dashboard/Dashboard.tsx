import { ChartBarLabel } from "@/components/LineChart/LineChart";
import { ChartPieDonutActive } from "@/components/PizzaChart/PizzaChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import { UserInfo } from "@/store/UserInfosStore";
import type { CountCallsByTeam } from "@/types/CountCallsByTeam/CountCallsByTeam";
import type { CountCallsByUrgency } from "@/types/CountCallsByUrgency/CountCallsByUrgency";
import type { CountCallsEnterprise } from "@/types/CountCallsEnterprise/CountCallsEnterprise";
import { useQuery } from "@tanstack/react-query";
import { Check, Clock, Ticket } from "lucide-react";


type DadosRelatorio = {
    dadosEmpresa: CountCallsEnterprise,
    dadosTimes: CountCallsByTeam,
    dadosUrgencia: CountCallsByUrgency
}

export default function Dashboard() {
    const { user } = UserInfo();

    const { data: dadosRelatorio, isLoading } = useQuery<DadosRelatorio>({
        queryKey: ["dadosRelatorio"],
        queryFn: async () => await GetDadosRelatorio()
    })

    async function GetDadosRelatorio(): Promise<DadosRelatorio> {
        const [dadosEmpresa, dadosTimes, dadosUrgencia] = await Promise.all([
            api.get(`api/calls/count/enterprise/${user?.enterpriseId}`),
            api.get(`api/calls/count/team`),
            api.get(`api/calls/count/urgency`)
        ]);

        const dados: DadosRelatorio = {
            dadosEmpresa: dadosEmpresa.data,
            dadosTimes: dadosTimes.data,
            dadosUrgencia: dadosUrgencia.data
        }

        return dados;
    }

    return (
        <>
            {
                isLoading ? (<div> Carregando...</div >) : (
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
                                                    <p className="text-2xl font-bold">{dadosRelatorio?.dadosEmpresa.total}</p>
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
                                                    <p className="text-2xl font-bold">{dadosRelatorio?.dadosEmpresa.totalAbertos}</p>
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
                                                    <p className="text-2xl font-bold">{dadosRelatorio?.dadosEmpresa.totalFechados}</p>
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
                                            {dadosRelatorio?.dadosTimes.times && (
                                                <ChartBarLabel times={dadosRelatorio.dadosTimes.times} />
                                            )}
                                        </div>
                                        <div className="w-full md:w-1/2">
                                        {
                                            dadosRelatorio?.dadosUrgencia.urgencias && (
                                                <ChartPieDonutActive />
                                            )
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                )
            }
        </>
    )
}