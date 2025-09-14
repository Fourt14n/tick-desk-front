import { Files } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface AcaoReturn {
    acao: Acao;
}

interface Acao{
    nomeUsuario: string,
    descricao: string,
    isPublic: boolean,
    dtHrCadastro: string
}

export default function History({acao}: AcaoReturn) {
    return (
        <div className="flex flex-col w-full gap-1">
            <div>
                <p className="font-bold">{acao.nomeUsuario}</p>
            </div>

            <div className={`${acao.isPublic ? "bg-white" : "bg-(--weakGreen)"} w-full p-2 rounded-2xl flex flex-col gap-2`}>
                <div>
                    <p>{acao.descricao}</p>
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
                        <p className="text-(--grey)">{acao.dtHrCadastro}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}