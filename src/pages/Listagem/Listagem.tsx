import { DataTable } from "@/components/Tabela/Tabela";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TicketColumns, type Ticket } from "@/tableObjects/TicketsTable";
import { UsersColumns, type User } from "@/tableObjects/UsersTable";
import { useParams } from "react-router";

export default function Listagem() {
    let { tipo = '' } = useParams();

    const dadosTesteTicket: Ticket[] = [
        {
            Id: "1",
            callNumber: 21,
            usernameEnvio: "Hebert",
            previsaoSolucao: new Date(),
            title: "Teste Tabela",
            urgencia: 1
        },
        {
            Id: "2",
            callNumber: 22,
            usernameEnvio: "Jean",
            previsaoSolucao: new Date(),
            title: "Erro de criação do chamado",
            urgencia: 2
        },
        {
            Id: "3",
            callNumber: 23,
            usernameEnvio: "João",
            previsaoSolucao: new Date(),
            title: "Melhoria na tela de Pedidos",
            urgencia: 1
        },
        {
            Id: "4",
            callNumber: 23,
            usernameEnvio: "Cliente Não Identificado",
            previsaoSolucao: new Date(),
            title: "Emissão de nota de serviço",
            urgencia: 3
        },
    ]

    const dadosTesteUser: User[] = [
        {
            Id: "1",
            Nome: "Hebert Lopes",
            Email: "hebertsep1914@gmail.com",
            Equipe: "Desenvolvimento",
            TipoUsuario: "ADMIN",
            DataHoraUltimaEntrada: new Date()
        },
        {
            Id: "2",
            Nome: "João Ferdinando",
            Email: "joazeta@outlook.com",
            Equipe: "Administrativo",
            TipoUsuario: "GERENTE",
            DataHoraUltimaEntrada: new Date()
        },
        {
            Id: "1",
            Nome: "Jean Carletos",
            Email: "jeanzinho2007@gmail.com",
            Equipe: "Suporte",
            TipoUsuario: "SUPORTE",
            DataHoraUltimaEntrada: new Date()
        },
    ]

    const renderDataTable = () => {
        switch (tipo) {
            case "Users":
                return (
                    <DataTable
                        columns={UsersColumns}
                        data={dadosTesteUser}
                        placeholder="Busque por nome do usuário"
                        caminho="/User/"
                        colunaPesquisa="Nome"
                    />
                );
            case "Tickets":
                return (
                    <DataTable
                        columns={TicketColumns}
                        data={dadosTesteTicket}
                        placeholder="Busque por título do ticket"
                        caminho="/Ticket/"
                        colunaPesquisa="TituloTicket"
                    />
                );
            default:
                return <div>Tipo não encontrado</div>;
        }
    };

    const renderTitleListagem = () => {
        switch(tipo){
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