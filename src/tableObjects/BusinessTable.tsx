import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";

export interface Business {
    id: string,
    name: string,
}

export const BusinessColumns: ColumnDef<Business>[] = [
  {
    accessorKey: "edit",
    header: "#",
    cell: ({row}) => {
      return (
        <Link to={`/Business/${row.original.id}`}><Edit size={22} className="cursor-pointer" /></Link> 
      )
    }
  },
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
    cell: ({row, table}) => {
      var meta = table.options.meta as { Exclusao?: (id : string) => void }
      return(
        <Trash2 className="cursor-pointer" onClick={() => meta?.Exclusao?.(row.original.id)} color="red"/>
      )
    }
  }
]