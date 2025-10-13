import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";

export interface Team {
    id: string,
    name: string,
}

export const TeamColumns: ColumnDef<Team>[] = [
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
    cell: () => {
      return(
        <Trash2 onClick={() => console.log("Teste")} color="red"/>
      )
    }
  }
]