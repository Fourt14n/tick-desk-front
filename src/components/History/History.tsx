import { Files } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { ResponseAction } from "@/types/ResponseAction/ResponseAction";

interface AcaoReturn {
    acao: ResponseAction;
}

export default function History({acao}: AcaoReturn) {
    return (
        <div className="flex flex-col w-full gap-1">
            <div>
                <p className="font-bold">{acao.user.name}</p>
            </div>

            <div className={`${true ? "bg-white" : "bg-(--weakGreen)"} w-full p-2 rounded-2xl flex flex-col gap-2`}>
                <div className=" break-all">
                    {acao.description}
                </div>
                <div className="flex justify-between p-1">
                    <div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Files size={20} cursor={"pointer"} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Listar arquivos enviados</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-(--grey)">{acao.data.toString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}