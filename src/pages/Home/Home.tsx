import HomeCard, { type TicketGroup } from "@/components/HomeCard/HomeCard";
import { Clock } from "@/components/HomeClock/HomeClock";
import { validateAuth } from "@/hooks/useAuth";
import { showError } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { capitalizeFirstWord } from "@/lib/utils";
import { UserInfo } from "@/store/UserInfosStore";
import { isPast, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

enum GroupType {
    User,
    Team,
    Enterprise,
    Error
}

// Para fins educativos eu vou criar aqui um array do bagulho pra nós ver funcionando
// var equipes = [{
//     GroupName: "Meus Tickets",
//     GroupId: 1,
//     Total: 11,
//     OpenedToday: 7,
//     ExpiresToday: 2,
//     Expired: 2
// },
// {
//     GroupName: "Desenvolvimento",
//     GroupId: 2,
//     Total: 21,
//     OpenedToday: 7,
//     ExpiresToday: 2,
//     Expired: 12
// },
// {
//     GroupName: "TickDesk Sistemas LTDA",
//     GroupId: 3,
//     Total: 12,
//     OpenedToday: 4,
//     ExpiresToday: 5,
//     Expired: 3
// }]

export default function Home() {
    const [equipes, setEquipes] = useState<TicketGroup[]>([]);
    console.log("Carregou a home")
    const { user } = UserInfo();

    async function PopularHome() {
        let resultadoUsuario = await GetUserTickets();
        console.log(resultadoUsuario)
        let resultadoEquipe = await GetTeamTickets();
        console.log(resultadoEquipe)
        let resultadoEmpresa = await GetEnterpiseTickets();
        console.log(resultadoEmpresa)

        setEquipes([resultadoUsuario, resultadoEquipe, resultadoEmpresa])

        console.log(equipes);

    }

    function GetUserTickets() {
        return api.get(`api/calls/user/${user?.id}`)
            .then(res => FormataChamados(GroupType.User, res.data))
            .catch(erro => FormataChamados(GroupType.Error))
    }

    function GetTeamTickets() {
        return api.get(`api/calls/team/${user?.teamId}`)
            .then(res => FormataChamados( GroupType.Team ,res.data))
            .catch(erro => FormataChamados(GroupType.Error))
    }

    function GetEnterpiseTickets() {
        return api.get(`api/calls/enterprise/${user?.enterpriseId}`)
            .then(res => FormataChamados(GroupType.Enterprise, res.data))
            .catch(erro => FormataChamados(GroupType.Error))
    }

    function FormataChamados(kind: GroupType, response?: any): TicketGroup {
        console.log(kind)
        console.log(response)
        let name = "ERRO AO RECUPERAR NOME DA EQUIPE";
        switch (kind) {
            case GroupType.User: name = "Meus Tickets"; break;
            case GroupType.Team: name = response.at(0).team.name; break;
            case GroupType.Enterprise: name = response.at(0).team.enterpriseDto.fantasyName; break;
            case GroupType.Error: {
                // Aqui vou fazer uma lógica de buscar pelo menos o nome da equipe pra conseguir popular
                // Mas falta rota pra buscar equipe por id
                name = "Teste"
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

            if (isToday(previsao)) // Vence hoje
                venceHoje++;
            else if (isPast(previsao)) // Vencidos
                vencidos++;

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
        (async() => {
            await PopularHome();
        })();
    }, []);

    return (
        <div className="w-full h-full px-5 md:px-20 bg-(--bg-default)">
            <div className="flex justify-center items-center md:justify-between w-full flex-col md:flex-row py-5 lg:py-10 gap-2 md:gap-0">
                <p className="text-(--grey) font-bold text-xl md:text-xl lg:text-2xl text-center">{`Seja bem-vindo(a), ${capitalizeFirstWord(user?.username!)}`}</p>

                <Clock />
            </div>
            <div className="flex flex-col gap-5 pb-10 lg:flex-row lg:pb:0 md-pb-5 lg:justify-center lg:items-center xl:justify-between">
                {equipes.map(item => {
                    console.log("SENTA NO BUGALU, SENTA NO BUGALU")
                    console.log(equipes)
                    return <HomeCard group={item} />
                })}
            </div>
        </div>
    )
}