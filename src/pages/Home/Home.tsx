import HomeCard, { type TicketGroup } from "@/components/HomeCard/HomeCard";
import { Clock } from "@/components/HomeClock/HomeClock";
import { Skeleton } from "@/components/ui/skeleton";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import { api } from "@/lib/axios";
import { capitalizeFirstWord } from "@/lib/utils";
import { UserInfo } from "@/store/UserInfosStore";
import { isPast, isToday } from "date-fns";
import { useEffect, useState } from "react";

enum GroupType {
    User,
    Team,
    Enterprise,
    Error
}

export default function Home() {
    const [equipes, setEquipes] = useState<TicketGroup[]>([]);
    // Isso aqui já é capricho
    // Penso em criar um Skeleton pra ficar bonitinho enquanto carrega
    // Mas é frescura isso aqui do loading
    const [loading, setLoading] = useState(true);
    const { user } = UserInfo();

    async function PopularHome() {
        const [resultadoUsuario, resultadoEquipe, resultadoEmpresa] = await Promise.all([
            GetUserTickets(),
            usePermission({ minPermission: PermissionsRoles.SUPORT }) && GetTeamTickets(),
            usePermission({ minPermission: PermissionsRoles.SUPORT }) && GetEnterpiseTickets()
        ])

        if(typeof resultadoEquipe !== typeof true)
            setEquipes([resultadoUsuario, resultadoEquipe as TicketGroup, resultadoEmpresa as TicketGroup]);
        else
            setEquipes([resultadoUsuario]);
        setLoading(false);
    }

    function GetUserTickets() {
        return api.get(`api/calls/user/${user?.id}`)
            .then(res => FormataChamados(GroupType.User, res.data))
            .catch(() => FormataChamados(GroupType.Error, undefined, GroupType.User))
    }

    function GetTeamTickets() {
        return api.get(`api/calls/team/${user?.teamId}`)
            .then(res => FormataChamados(GroupType.Team, res.data))
            .catch(() => FormataChamados(GroupType.Error, undefined, GroupType.Team))
    }

    function GetEnterpiseTickets() {
        return api.get(`api/calls/enterprise/${user?.enterpriseId}`)
            .then(res => FormataChamados(GroupType.Enterprise, res.data))
            .catch(() => FormataChamados(GroupType.Error, undefined, GroupType.Enterprise))
    }

    function FormataChamados(kind: GroupType, response?: any, secundaryKind?: GroupType): TicketGroup {
        console.log(kind)
        console.log(response)
        let name = "ERRO AO RECUPERAR NOME DA EQUIPE";
        switch (kind) {
            case GroupType.User: name = "Meus Tickets"; break;
            case GroupType.Team: name = response.at(0).team.name; break;
            case GroupType.Enterprise: name = response.at(0).team.enterpriseDto.fantasyName; break;
            case GroupType.Error: {
                // Caso não encontre ele vai vir aqui buscar o nome
                if (secundaryKind === GroupType.Team)
                    name = user?.enterpriseName || "Time não encontrado";
                else if (secundaryKind === GroupType.Enterprise)
                    name = user?.teamName || "Empresa não encontrada";
                else
                    name = "Meus Tickets";
                break;
            }
        }

        let total = 0;
        let venceHoje = 0;
        let vencidos = 0;
        let abertosHoje = 0; // Tá faltando a data de cadastro no retorno dos chamados

        response?.forEach((chamado: any) => {
            console.log("Entrou no foreach")
            const previsao = new Date(chamado.previsaoSolucao);
            const abertura = new Date(chamado.dataAbertura);

            if (isToday(previsao)) // Vence hoje
                venceHoje++;
            else if (isPast(previsao)) // Vencidos
                vencidos++;

            if (isToday(abertura))
                abertosHoje++;

            total++;
        })

        return {
            Expired: vencidos,
            ExpiresToday: venceHoje,
            GroupName: name,
            OpenedToday: abertosHoje,
            Total: total
        }

    }

    useEffect(() => {
        (async () => {
            await PopularHome();
        })();
    }, []);

    return (
        <div className={`w-full px-5 md:px-20 bg-(--bg-default) ${loading ? "h-dvh" : "h-full"}`}>
            {loading ?
                <div className="flex flex-col lg:flex-row flex-1 h-full justify-evenly items-center space-y-6">
                    <Skeleton className="h-96 w-64 bg-[#c1cac1]"></Skeleton>
                    <Skeleton className="h-96 w-64 bg-[#c1cac1]"></Skeleton>
                    <Skeleton className="h-96 w-64 bg-[#c1cac1]"></Skeleton>

                </div>
                :
                <>
                    <div className="flex justify-center items-center md:justify-between w-full flex-col md:flex-row py-5 lg:py-10 gap-2 md:gap-0">
                        <p className="text-(--grey) font-bold text-xl md:text-xl lg:text-2xl text-center">{`Seja bem-vindo(a), ${capitalizeFirstWord(user?.username!)}`}</p>

                        <Clock />
                    </div>
                    <div className="flex flex-col gap-5 pb-10 lg:flex-row lg:pb:0 md-pb-5 lg:justify-center lg:items-center xl:justify-between">
                        {
                            equipes.map(item => {
                                return <HomeCard group={item} />
                            })
                        }
                    </div>
                </>
            }

        </div>
    )
}