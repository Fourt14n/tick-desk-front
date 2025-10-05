import { Button } from "@/components/ui/button";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
      console.log()
      let valorAlterado = row.original.role;
      switch(value){
        case "CLIENT": valorAlterado = "Cliente"; break;
        case "GERENT": valorAlterado = "Gerente"; break;
        case "SUPORT": valorAlterado = "Suporte"; break;
      }
      return valorAlterado;
    }
  },
  // {
  //   accessorKey: "DataHoraUltimaEntrada",
  //   header: "Ultima Entrada",
  // },
]