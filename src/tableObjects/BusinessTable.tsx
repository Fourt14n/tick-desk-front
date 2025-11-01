import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";

export interface Business {
    id: string,
    name: string,
}

export const BusinessColumns: ColumnDef<Business>[] = [
  {
    accessorKey: "id",
    header: "ID da Empresa"
  },
  {
    accessorKey: "fantasyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Fantasia
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email"
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