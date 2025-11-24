import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ResponseUser } from "@/types/ResponseUser/ResponseUser";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";
import { Link } from "react-router";

export interface Ticket {
    id: string,
    numberCall: number,
    title: string,
    previsaoSolucao: Date,
    dataAbertura: Date,
    urgency: string,
    userResponsavel: ResponseUser
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
    accessorKey: "numberCall",
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
    accessorKey: "urgency",
    header: "Urgência",
    cell: ({row}) => {
      switch(row.original.urgency){
        case "ALTA": return <Badge className="w-full xl:w-2/3" variant={"ALTA"}>{row.original.urgency}</Badge>;
        case "MEDIA": return <Badge className="w-full xl:w-2/3" variant={"MEDIA"}>{row.original.urgency}</Badge>;
        case "BAIXA": return <Badge className="w-full xl:w-2/3" variant={"BAIXA"}>{row.original.urgency}</Badge>;
      }
    }
  },
]