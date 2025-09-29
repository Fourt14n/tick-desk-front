import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export interface Ticket {
    Id: string,
    NumeroTicket: number,
    TituloTicket: string,
    NomeCriador: string,
    PrevisaoSolucao: Date,
    Urgencia: number
}

export const TicketColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "callNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número do Ticket
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "TituloTicket",
    header: "Titulo",
  },
  {
    accessorKey: "NomeCriador",
    header: "Criador",
  },
  {
    accessorKey: "PrevisaoSolucao",
    header: "Previsão de Solução",
  },
  {
    accessorKey: "Urgencia",
    header: "Urgência",
  },
]