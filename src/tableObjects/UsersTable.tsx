import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export interface User {
    Id: string,
    Nome: string,
    Email: string,
    Equipe: string,
    TipoUsuario: string,
    DataHoraUltimaEntrada: Date
}

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "Nome",
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
    accessorKey: "Email",
    header: "E-mail",
  },
  {
    accessorKey: "Equipe",
    header: "Equipe",
  },
  {
    accessorKey: "TipoUsuario",
    header: "Tipo de Usuário",
  },
  {
    accessorKey: "DataHoraUltimaEntrada",
    header: "Ultima Entrada",
  },
]