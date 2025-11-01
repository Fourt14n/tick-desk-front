import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";
import { Link } from "react-router";

export interface Ticket {
    id: string,
    callNumber: number,
    title: string,
    previsaoSolucao: Date,
    urgencia: number
}

export const TicketColumns: ColumnDef<Ticket>[] = [
   {
    accessorKey: "edit",
    header: "#",
    cell: ({row}) => {
      return (
        <Link to={`/Ticket/${row.original.id}`}><Edit size={22} className="cursor-pointer" /></Link> 
      )
    }
  },
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
    accessorKey: "previsaoSolucao",
    header: "Previsão de Solução",
    cell: ({row}) => {
      return new Date(row.original.previsaoSolucao).toLocaleDateString();
    }
  },
  {
    accessorKey: "urgencia",
    header: "Urgência",
  },
]