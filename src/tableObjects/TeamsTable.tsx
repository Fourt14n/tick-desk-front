import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";

export interface Team {
    id: string,
    name: string,
}

export const TeamColumns: ColumnDef<Team>[] = [
   {
    accessorKey: "edit",
    header: "#",
    cell: ({row}) => {
      return (
        <Link to={`/Teams/${row.original.id}`}><Edit size={22} className="cursor-pointer" /></Link> 
      )
    }
  },
  {
    accessorKey: "id",
    header: "Número da equipe"
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome da Equipe
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    header: " ",
    cell: ({row, table}) => {
      var meta = table.options.meta as { Exclusao?: (id : string) => void }
      return(
        <Trash2 className="cursor-pointer" onClick={() => meta?.Exclusao?.(row.original.id)} color="red"/>
      )
    }
  }
]