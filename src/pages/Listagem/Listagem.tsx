import { DataTable } from "@/components/Tabela/Tabela";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TicketColumns, type Ticket } from "@/tableObjects/TicketsTable";
import { useParams } from "react-router";

export default function Listagem() {
    let { tipo = '' } = useParams();

    const dadosTeste: Ticket[] = [
        {
            Id: "teste",
            NumeroTicket: 21,
            NomeCriador: "Hebert",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela",
            Urgencia: 1
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
        {
            Id: "teste2",
            NumeroTicket: 22,
            NomeCriador: "Teste Hebert 2",
            PrevisaoSolucao: new Date(),
            TituloTicket: "Teste Tabela 2",
            Urgencia: 3
        },
    ]

    return (
        <div className="flex w-full h-full p-3 overflow-hidden">
            <ScrollArea className="w-full h-full">
                <div className="flex flex-col p-3 w-full">
                    <div className="flex flex-col justify-center">
                        <p className="text-(--text-strongGreen) font-bold">{tipo}</p>
                        <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                    </div>
                </div>
                <div className="flex w-full overflow-hidden">
                    <DataTable columns={TicketColumns} data={dadosTeste} />
                </div>
            </ScrollArea>
        </div>
    )
}