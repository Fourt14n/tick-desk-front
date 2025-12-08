import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";

export interface User {
    id: string,
    name: string,
    email: string,
    teamId: string,
    role: string,
    DataHoraUltimaEntrada: Date
}

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "edit",
    header: "#",
    cell: ({row}) => {
      return (
        <Link to={`/User/${row.original.id}`}><Edit size={22} className="cursor-pointer" /></Link> 
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  // {
  //   accessorKey: "Equipe",
  //   header: "Equipe",
  // },
  {
    accessorKey: "role",
    header: "Tipo de Usuário",
    cell: ({ row }) => {
      const value = row.original.role;
      
      let valorAlterado = row.original.role;
      switch(value){
        case "CLIENT": valorAlterado = "Cliente"; break;
        case "GERENT": valorAlterado = "Gerente"; break;
        case "SUPORT": valorAlterado = "Suporte"; break;
      }
      return valorAlterado;
    }
  }
  // {
  //   accessorKey: "DataHoraUltimaEntrada",
  //   header: "Ultima Entrada",
  // },
]