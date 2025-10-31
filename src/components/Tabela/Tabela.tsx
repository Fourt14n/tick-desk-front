import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    type ColumnDef,
    getSortedRowModel,
    type SortingState,
    type ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import React from "react"
import { Input } from "../ui/input"
import { Link, useNavigate } from "react-router"
import type { Ticket } from "@/tableObjects/TicketsTable"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    placeholder: string,
    caminho: string,
    colunaPesquisa: string,
}

// Aqui é um código puxado dos componentes do ShadCN
// Porque a Table é um componente bem complexo e com muitos meandros
// Vou usar o código base do componentes deles e fazer as alterações que preciso

export function DataTable<TData, TValue>({
    columns,
    data,
    placeholder,
    caminho,
    colunaPesquisa
}: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        }
    });
    
    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-full w-full">
            {/* Header fixo com input de busca */}
            <div className="flex items-center py-4 justify-between">
                <Input
                    placeholder={placeholder}
                    value={(table.getColumn(colunaPesquisa)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(colunaPesquisa)?.setFilterValue(event.target.value)
                    }
                    className="md:max-w-sm max-w-full"
                />

                {
                    caminho.includes("User") &&
                    <Link to="/User/Create">
                        <Button className="bg-(--weakGreen) lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">
                            Novo
                        </Button>
                    </Link>
                }
                {
                    caminho.includes("Teams") &&
                    <Link to="/Teams/Create">
                        <Button className="bg-(--weakGreen) lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">
                            Novo
                        </Button>
                    </Link>
                }
                {
                    caminho.includes("Business") &&
                    <Link to="/Business/Create">
                        <Button className="bg-(--weakGreen) lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">
                            Novo
                        </Button>
                    </Link>
                }
            </div>

            {/* Container da tabela com scroll */}
            <div className="overflow-auto rounded-md border">
                <Table>
                    <TableHeader className="bg-muted/50 sticky top-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => {
                                        var caminhoEspecifico = `${caminho}${(row.original as Ticket).id}`;
                                        navigate(caminhoEspecifico)
                                    }}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                                    Listagem vazia.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer fixo com paginação */}
            <div className="relative bottom-0 flex items-center justify-between space-x-2 py-4 w-full">
                <div className="flex justify-between items-center w-full">
                    <div className="text-sm text-muted-foreground">
                        Exibindo um total de {table.getRowCount()} registros
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Próximo
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}