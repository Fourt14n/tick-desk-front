import { useEffect, useState } from "react";
import History from "../History/History";
import { Separator } from "../ui/separator";
import { api } from "@/lib/axios";
import { showError } from "@/hooks/useToast";
import { UserInfo } from "@/store/UserInfosStore";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import type { ResponseAction } from "@/types/ResponseAction/ResponseAction";

type ActionHistoryInfos = {
    ticket: number
}

export default function ActionHistory({ticket} : ActionHistoryInfos) {
    const [acoesChamado, setAcoesChamado] = useState<ResponseAction[]>([]);
    const {user} = UserInfo();
    // Pra fins educativos vou criar um array de objetos pra gente testar já dinamicamente
    // const acoesChamado = [
    //     { nomeUsuario: "Gabriel Constantin", descricao: "Foi criada uma tela de edição de tickets para o sistema, verificar o Figma do projeto para a revisão e análise", isPublic: true, dtHrCadastro: "17/08/2025 11:55" },
    //     { nomeUsuario: "Hebert Lopes", descricao: "Prototipar uma tela de edição e criação de tickets no Figma.", isPublic: false, dtHrCadastro: "11/08/2025 19:35" },
    // ]

    function SelectAllActions() {
        return api.get(`api/actions/call/${ticket}`)
            .then(res => res.data)
            .catch(erro => showError(erro.response.data.error))
    }

    function SelectActionByUser() {
        return api.get(`api/actions/user/${user?.id}`)
            .then(res => res.data)
            .catch(erro => showError(erro.response.data.error))
    }

    async function setActionsFiltered(){
        var actions : ResponseAction[] = [];
        if(usePermission({minPermission: PermissionsRoles.SUPORT}))
            actions = await SelectAllActions();
        else
            actions = await SelectActionByUser();

        setAcoesChamado(actions);

    }

    useEffect(() => {
        setActionsFiltered();
    }, [ticket])

    return (
        <div className="pt-4 h-full">
            <div className="flex flex-col justify-center row-span-1">
                <p className="text-(--text-strongGreen) font-bold">Histórico de ações</p>
                <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
            </div>

            <div className="flex flex-col gap-4 pt-4">
                {acoesChamado.map(item => <History acao={item} />)}
            </div>
        </div>
    )
}