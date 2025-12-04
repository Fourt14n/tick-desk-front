import { Files } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { EStatusAction, type ResponseAction } from "@/types/ResponseAction/ResponseAction";
import useFileList from "@/hooks/useFileList";
import { formatarData } from "@/utils/utils";
import FilesView from "../FilesView/FilesView";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface AcaoReturn {
    acao: ResponseAction;
}

export default function History({ acao }: AcaoReturn) {
    const fileList = useFileList();
    const [visible, setVisible] = useState(false);
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
                                <Files className="hidden" onClick={() => {
                                    // fileList.open({
                                    //     title: "Arquivos enviados",
                                    //     description: <FilesView arquivos={acao.files}/>

                                    // })
                                    setVisible(true);
                                }} size={20} cursor={"pointer"} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Listar arquivos enviados</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Dialog draggable={false} header={`Arquivos enviados (${acao.files.length})`} visible={visible} style={{ width: '40vw' }} breakpoints={{'1280px': '75vw', '720px': '85vw'}} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <FilesView arquivos={acao.files}/>
                    </Dialog>
                    <div className="flex justify-end">
                        <p className="text-(--grey)">{formatarData(acao.data, true)}</p>
                    </div>
                </div>
            </div>
            {fileList.DialogComponent}
        </div>
    )
}