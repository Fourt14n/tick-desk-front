import { DataTable } from "@/components/Tabela/Tabela";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import useConfirmation from "@/hooks/useConfirmation";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import { showError } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { UserInfo } from "@/store/UserInfosStore";
import { BusinessColumns, type Business } from "@/tableObjects/BusinessTable";
import { TeamColumns, type Team } from "@/tableObjects/TeamsTable";
import { TicketColumns, type Ticket } from "@/tableObjects/TicketsTable";
import { UsersColumns, type User } from "@/tableObjects/UsersTable";
import { differenceInCalendarDays, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

export default function Listagem() {
    let { tipo = '' } = useParams();
    const [dataUsers, setDataUsers] = useState<User[]>([]);
    const [dataTickets, setDataTickets] = useState<Ticket[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [business, setBusiness] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = UserInfo();
    const navigate = useNavigate();
    const confirmDelete = useConfirmation();
    const [queryParams] = useSearchParams();

    function GetUsers() {
        const endpoint = `api/enterprise/${user?.enterpriseId}/users`;
        getData<User[]>(endpoint)
            .then(result => {
                // Lógica pra não mostrar usuários ADMIN pra quem não for ADMIN
                !usePermission({ minPermission: PermissionsRoles.ADMIN })
                    ? setDataUsers(result.filter(user => user.role !== "ADMIN"))
                    : setDataUsers(result);
            })
            .catch(erro => {
                showError(erro);
            });
    }

    function GetTeams() {
        const endpoint = `api/enterprise/${user?.enterpriseId}/teams`;
        getData<Team[]>(endpoint)
            .then(result => {
                setTeams(result);
                
            })
            .catch(erro => {
                showError(erro);
                
            });
    }

    function GetTickets() {
        const endpoint = `api/calls/enterprise/${user?.enterpriseId}`;
        getData<Ticket[]>(endpoint)
            .then(result => {
                var period = queryParams.get("period") || "";
                var group = queryParams.get("group") || "";

                if(group !== ""){
                    switch(group){
                        case "mine": result = result.filter(ticket => ticket?.team?.id === user?.id);break;
                        case "team": result = result.filter(ticket => ticket?.team.id === user?.teamId);break;
                        case "business": result = result.filter(ticket => ticket?.team.enterpriseDto.id === user?.enterpriseId);break;
                    }
                }

                if(period !== ""){               
                    switch(period){
                        case "expiresToday": result = result.filter(ticket => isToday(ticket?.previsaoSolucao));break;
                        case "openedToday": result = result.filter(ticket => isToday(ticket?.dataAbertura));break;
                        case "expired": result = result.filter(ticket => differenceInCalendarDays(ticket?.previsaoSolucao, new Date()) < 0);break;
                    }
                }
                setDataTickets(result);
                
            })
            .catch(erro => {
                showError(erro);
                
            });
    }

    function GetEnterprises() {
        const endpoint = `api/enterprise/get`;
        getData<Business[]>(endpoint)
            .then(result => {
                setBusiness(result);
                
            })
            .catch(erro => {
                showError(erro);
                
            });
    }

    useEffect(() => {
        setIsLoading(true);
        switch (tipo) {
            case "Users": {
                GetUsers();
                break;
            }
            case "Tickets": {
                GetTickets();
                break;
            };
            case "Teams": {
                GetTeams();
                break;
            };
            case "Business": {
                // Por se tratar de uma tela sensível eu vou fazer essa validação
                if (usePermission({ minPermission: PermissionsRoles.ADMIN })) {
                    GetEnterprises();
                    break;
                } else {
                    showError("Permissão negada para visualização dessa tela!");
                    navigate("/Home");
                }

            };
        }
    }, [tipo, queryParams]);


    async function getData<T>(endpoint: string) {
        var resultado = await api.get<T>(endpoint)
            .then(res => res.data)
            .catch(erro => {
                showError(erro.response.data.error);
                return [];
            });
            setIsLoading(false);
        return resultado;
    }

    const renderDataTable = () => {
        switch (tipo) {
            case "Users":
                return (
                    <DataTable
                        columns={UsersColumns}
                        data={dataUsers}
                        placeholder="Busque por nome do usuário"
                        caminho="/User/"
                        colunaPesquisa="name"
                        exclusaoFunc={(id: string) => {
                            confirmDelete.open({
                                title: "Confirma exclusão?",
                                description: "Você tem certeza que deseja excluir esse usuário?",
                                onConfirm: async() => {
                                    await api.delete(`api/user/delete/${id}`)
                                    .then(() => GetUsers())
                                    .catch(erro => showError(erro.response.data.error))
                                }
                            })
                        }}
                    />
                );
            case "Tickets":
                return (
                    <DataTable
                        columns={TicketColumns}
                        data={dataTickets}
                        placeholder="Busque por título do ticket"
                        caminho="/Ticket/"
                        colunaPesquisa="title"
                    />
                );
            case "Teams":
                return (
                    <DataTable
                        columns={TeamColumns}
                        data={teams}
                        placeholder="Busque por nome da equipe"
                        caminho="/Teams/"
                        colunaPesquisa="name"
                        exclusaoFunc={(id: string) => {
                            confirmDelete.open({
                                title: "Confirma exclusão?",
                                description: "Você tem certeza que deseja excluir essa equipe?",
                                onConfirm: async() => {
                                    await api.delete(`api/team/delete/${id}`)
                                    .then(() => GetTeams())
                                    .catch(erro => showError(erro.response.data.error))
                                }
                            })
                        }}
                    />
                );
            case "Business":
                return (
                    <DataTable
                        columns={BusinessColumns}
                        data={business}
                        placeholder="Busque por nome da empresa"
                        caminho="/Business/"
                        colunaPesquisa="fantasyName"
                        exclusaoFunc={(id: string) => {
                            confirmDelete.open({
                                title: "Confirma exclusão?",
                                description: "Você tem certeza que deseja excluir essa empresa?",
                                onConfirm: async() => {
                                    await api.delete(`api/enterprise/delete/${id}`)
                                    .then(() => GetEnterprises())
                                    .catch(erro => showError(erro.response.data.error))
                                }
                            })
                        }}
                    />
                );
            default:
                return <div>Listagem não encontrado</div>;
        }
    };

    const renderTitleListagem = () => {
        switch (tipo) {
            case "Users":
                return "Usuários"
            case "Tickets":
                return "Tickets"
            case "Teams":
                return "Equipes"
            case "Business":
                return "Empresas"
        }
    }

    return (
        <div className="flex w-full h-full p-3 overflow-hidden">
            <ScrollArea className="w-full h-full">
                <div className="flex flex-col p-3 w-full">
                    <div className="flex flex-col justify-center">
                        <p className="text-(--text-strongGreen) font-bold">{renderTitleListagem()}</p>
                        <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                    </div>
                </div>
                <div className="flex w-full overflow-hidden">
                    {
                    isLoading ? (
                        <div className="flex flex-col gap-3 justify-center items-center flex-1 h-full">
                            <Skeleton className="h-15 w-full bg-[#c1cac1]"></Skeleton>
                            <Skeleton className="h-15 w-full bg-[#c1cac1]"></Skeleton>
                            <Skeleton className="h-15 w-full bg-[#c1cac1]"></Skeleton>
                            <Skeleton className="h-15 w-full bg-[#c1cac1]"></Skeleton>
                            <Skeleton className="h-15 w-full bg-[#c1cac1]"></Skeleton>
                        </div>
                    )
                    : renderDataTable()
                    }
                </div>
            </ScrollArea>
            {confirmDelete.DialogComponent}
        </div>
    )
}