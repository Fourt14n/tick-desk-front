import { DataTable } from "@/components/Tabela/Tabela";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { showError } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { TicketColumns, type Ticket } from "@/tableObjects/TicketsTable";
import { UsersColumns, type User } from "@/tableObjects/UsersTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Listagem() {
    let { tipo = '' } = useParams();
    const [dataUsers, setDataUsers] = useState<User[]>([]);
    const [dataTickets, setDataTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let endpoint = "";

        switch (tipo) {
            case "Users": {
                endpoint = "api/user/get";
                getData<User[]>(endpoint)
                    .then(result => {
                        setDataUsers(result);
                        setLoading(false);
                    })
                    .catch(erro => {
                        showError(erro);
                        setLoading(false);
                    });
                break;
            }
            case "Tickets": {
                endpoint = "api/calls/list"; 
                getData<Ticket[]>(endpoint)
                    .then(result => {
                        console.log(result)
                        setDataTickets(result);
                        setLoading(false);
                    })
                    .catch(erro => {
                        showError(erro);
                        setLoading(false);
                    });
                break;
            };
        }

    }, [tipo]);


    async function getData<T>(endpoint: string) {
        var resultado = await api.get<T>(endpoint)
            .then(res => res.data)
            .catch(erro => {
                showError(erro.response.data.error);
                return [];
            });
        console.log(resultado)
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
            default:
                return <div>Tipo não encontrado</div>;
        }
    };

    const renderTitleListagem = () => {
        switch (tipo) {
            case "Users":
                return "Usuários"
            case "Tickets":
                return "Tickets"
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
                        renderDataTable()
                    }
                </div>
            </ScrollArea>
        </div>
    )
}