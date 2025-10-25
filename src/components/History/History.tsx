import { Files } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { EStatusAction, type ResponseAction } from "@/types/ResponseAction/ResponseAction";
import useFileList from "@/hooks/useFileList";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface AcaoReturn {
    acao: ResponseAction;
}

export default function History({acao}: AcaoReturn) {
    const fileList = useFileList();

    // const {data: arquivo} = useQuery({
    //     queryKey: ["arquivosAction"],
    //     staleTime: Infinity,
    //     refetchOnWindowFocus: false,
    //     queryFn: 
    // })

    // function GetFilesFromAction(){
    //     api.get(`api/files/filesList`)
    // }

    return (
        <div className="flex flex-col w-full gap-1">
            <div>
                <p className="font-bold">{acao.user.name}</p>
            </div>

            <div className={`${acao.statusAction === EStatusAction.PUBLIC ? "bg-white" : "bg-(--weakGreen)"} w-full p-2 rounded-2xl flex flex-col gap-2`}>
                <div className=" break-all">
                    {acao.description}
                </div>
                <div className="flex justify-between p-1">
                    <div>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Files onClick={() => {
                                    fileList.open({
                                        title: "Arquivos enviados",
                                    })
                                }} size={20} cursor={"pointer"} />
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
            {fileList.DialogComponent}
        </div>
    )
}