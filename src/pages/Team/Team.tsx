import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { onError } from "@/hooks/onError";
import { showError, showSucces } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { UserInfo } from "@/store/UserInfosStore";
import { UsersColumns, type User } from "@/tableObjects/UsersTable";
import { EAction, type Action } from "@/types/EAction/EAction";
import { team } from "@/validations/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import type z from "zod";

type Team = z.infer<typeof team>;

export default function Team({ action }: Action) {
    const [users, setUsers] = useState<User[]>([]);
    const {user} = UserInfo();
    let { id = '' } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, register, reset, setValue, formState: { isValid, isSubmitting } } = useForm({
        resolver: zodResolver(team)
    });
    const table = useReactTable({
        data: users,
        columns: UsersColumns,
        getCoreRowModel: getCoreRowModel(),
        initialState: {
            columnVisibility: { exclude: false, edit: false }
        }

    })

    function OnSubmit(data: Team) {
        if (isValid) {
            if (action === EAction.CREATE)
                CreateTeam(data);
            else if (action)
                UpdateTeam(data);
        }
    }

    function GetUsersByTeam() {
        api.get(`api/team/get-user/${id}`)
            .then(res => setUsers(res.data))
            .catch(erro => {
                showError(erro.response.data.error);
            })
    }

    function GetTeamById() {
        api.get(`api/team/get/${id}`)
            .then(res => {
                reset(res.data)
            })
            .catch(erro => {
                showError(erro.response.data.error);
            })
    }

    function CreateTeam(team: Team) {
        api.post("api/team/create", team)
            .then(res => {
                showSucces("Equipe criada com sucesso!");
                setTimeout(() => navigate("/Listagem/Teams"), 3000);
            }).catch(erro => showError(erro.response.data.error))
    }
    function UpdateTeam(team: Team) {
        api.put(`api/team/update/${id}`, team)
            .then(res => {
                showSucces("Equipe atualizada com sucesso!");
                setTimeout(() => navigate("/Listagem/Teams"), 3000);
            }).catch(erro => showError(erro.response.data.error))
    }

    useEffect(() => {
        setValue("enterpriseId", user?.enterpriseId!);
        if (action === EAction.UPDATE) {
            GetUsersByTeam();
            GetTeamById();
        }
    }, [])

    return (
        <div className="flex h-full w-full">
            <ScrollArea className="w-full h-full p-4">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col justify-center">
                        <p className="text-(--text-strongGreen) font-bold">Cadastro de equipe</p>
                        <Separator className="bg-[#BAB9B9]" orientation="horizontal" />
                    </div>
                </div>
                <form onSubmit={handleSubmit(OnSubmit, onError)} className="flex h-full w-full flex-col justify-evenly lg:justify-between pt-4 lg:py-10">
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-rows-[auto_1fr_auto] h-full w-full gap-4">
                            <div className="flex flex-col w-full gap-2">
                                <Label htmlFor="txtName">Nome da equipe</Label>
                                <Input {...register("name")} maxLength={255} className="text-sm" placeholder="Nome da equipe" type="text" id="txtName" />
                            </div>
                            {
                                action === EAction.UPDATE &&
                                <div className="flex overflow-hidden flex-col gap-2">
                                    <Label className="text-base">Usuários da Equipe</Label>
                                    <Table className="border-1 border-black-50">
                                        <TableHeader>
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
                                                    <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                                        Equipe sem usuários.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex w-full justify-end gap-2 flex-col py-2 lg:flex-row">
                        <Button disabled={isSubmitting} type="submit" className="bg-(--weakGreen) w-full lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">{action === EAction.CREATE ? "Cadastrar" : "Atualizar"}</Button>
                        <Link to="/Listagem/Teams">
                            <Button variant={"destructive"} type="submit" className="w-full lg:w-42 cursor-pointer">Voltar</Button>
                        </Link>
                    </div>

                </form>
            </ScrollArea>
        </div>
    )
}