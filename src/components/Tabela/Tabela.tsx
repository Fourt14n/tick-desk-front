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
import { useNavigate } from "react-router"
import type { Ticket } from "@/tableObjects/TicketsTable"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

// Aqui é um código puxado dos componentes do ShadCN
// Porque a Table é um componente bem complexo e com muitos meandros
// Vou usar o código base do componentes deles e fazer as alterações que preciso

export function DataTable<TData, TValue>({
    columns,
    data,
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
        <div className="w-full overflow-hidden max-1/2">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar por nome"
                    value={(table.getColumn("TituloTicket")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("TituloTicket")?.setFilterValue(event.target.value)
                    }
                    className="max-w-2/5"
                />
            </div>
            <Table className="overflow-hidden max-w-full" align="center">
                <TableHeader className="bg-[#F3F0F0]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="border-1 border-[--grey]" key={headerGroup.id}>
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
                                onClick={() => navigate(`/Ticket/${(row.original as Ticket).Id}`)}
                                className="cursor-pointer border-1 border-[--grey]"
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
                            <TableCell colSpan={columns.length}>
                                Listagem vazia.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div>
                    <p>Exibindo um total de {table.getRowCount()} registros</p>
                </div>
                <div>
                    <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    className="cursor-pointer"
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
    )
}