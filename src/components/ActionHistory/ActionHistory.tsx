import History from "../History/History";
import { Separator } from "../ui/separator";
import { api } from "@/lib/axios";
import { showError } from "@/hooks/useToast";
import { UserInfo } from "@/store/UserInfosStore";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import type { ResponseAction } from "@/types/ResponseAction/ResponseAction";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type ActionHistoryInfos = {
    ticket: number,
}

export default function ActionHistory({ ticket }: ActionHistoryInfos) {
    const { user } = UserInfo();
    const [isLoading, setIsLoading] = useState(false);
    const hasPermission = usePermission({ minPermission: PermissionsRoles.SUPORT });

    const { data: acoesChamado } = useQuery<ResponseAction[]>({
        queryKey: ["acoesChamado", ticket],
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 1, // Refaz a busca dos tickets a cada 1 minuto
        queryFn: () => setActionsFiltered()
    })

    async function SelectAllActions() {
        setIsLoading(true);
        return await api.get(`api/actions/call/${ticket}`)
            .then(res => res.data)
            .catch(erro => showError(erro.response.data.error))
    }

    async function SelectActionByUser() {
        setIsLoading(true);
        return await api.get(`api/actions/user/${user?.id}`)
            .then(res => res.data)
            .catch(erro => showError(erro.response.data.error))
    }

    async function setActionsFiltered(): Promise<ResponseAction[]> {
        var actions: ResponseAction[] = [];
        if (hasPermission)
            actions = await SelectAllActions();
        else
            actions = await SelectActionByUser();

        setIsLoading(false);
        return actions;
    }

    return (
        <div className="pt-4 h-full">
            <div className="flex flex-col justify-center row-span-1">
                <p className="text-(--text-strongGreen) font-bold">Histórico de ações</p>
                <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
            </div>

            {
                isLoading ? (
                    <div className="flex gap-5 p-2 flex-col w-full">
                        <Skeleton className="h-20 w-full bg-[#c1cac1]"></Skeleton>
                        <Skeleton className="h-20 w-full bg-[#c1cac1]"></Skeleton>
                    </div>
                )
                    :
                    (
                        <div className="flex flex-col gap-4 pt-4">
                            {acoesChamado?.map(item => <History acao={item} />)}
                        </div>
                    )
            }
        </div>
    )
}