import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export interface Ticket {
    id: string,
    callNumber: number,
    title: string,
    usernameEnvio: string,
    previsaoSolucao: Date,
    urgencia: number
}

export const TicketColumns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
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
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "usernameEnvio",
    header: "Criador",
  },
  {
    accessorKey: "previsaoSolucao",
    header: "Previsão de Solução",
  },
  {
    accessorKey: "urgencia",
    header: "Urgência",
  },
]