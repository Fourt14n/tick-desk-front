import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { onError } from "@/hooks/onError";
import usePermission, { PermissionsRoles } from "@/hooks/usePermission";
import { showError, showSucces } from "@/hooks/useToast";
import { api } from "@/lib/axios";
import { UserInfo } from "@/store/UserInfosStore";
import { UsersColumns, type User } from "@/tableObjects/UsersTable";
import { EAction, type Action } from "@/types/EAction/EAction";
import { team } from "@/validations/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import type z from "zod";

type Team = z.infer<typeof team>;

export default function Team({ action }: Action) {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = UserInfo();
    let { id = '' } = useParams();
    const navigate = useNavigate();
    const { handleSubmit, register, reset, formState: { isSubmitting,  } } = useForm({
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

    async function OnSubmit(data: Team) {
            if (action === EAction.CREATE)
                await CreateTeam(data);
            else if (action)
                await UpdateTeam(data);
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
                setIsLoading(false);
            })
            .catch(erro => {
                showError(erro.response.data.error);
            })
    }

    async function CreateTeam(team: Team) {
        await api.post("api/team/create", team)
            .then(() => {
                showSucces("Equipe criada com sucesso!");
                navigate("/Listagem/Teams");
            }).catch(erro => showError(erro.response.data.error))
    }
    async function UpdateTeam(team: Team) {
        await api.put(`api/team/update/${id}`, team)
            .then(() => {
                showSucces("Equipe atualizada com sucesso!");
                navigate("/Listagem/Teams");
            }).catch(erro => showError(erro.response.data.error))
    }

    useEffect(() => {
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

                {
                    isLoading && action === EAction.UPDATE ?
                        (
                            <div className="flex flex-col lg:justify-normal justify-center p-5 gap-10 flex-1 h-full">
                                <div className="flex gap-1 flex-row w-full">
                                    <Skeleton className="h-10 w-full bg-[#c1cac1]"></Skeleton>
                                </div>
                                <div className="flex gap-5 flex-col w-full p-2 border-2">
                                    <div className="flex gap-1 flex-row w-full">
                                        <Skeleton className="h-15 lg:h-15 w-full bg-[#c1cac1]"></Skeleton>
                                    </div>
                                    <div className="flex gap-1 flex-row w-full">
                                        <Skeleton className="h-15 lg:h-15 w-full bg-[#c1cac1]"></Skeleton>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                        :
                        (
                            <form onSubmit={handleSubmit(OnSubmit, onError)} className="flex h-full w-full flex-col justify-evenly lg:justify-between pt-4 lg:py-10">
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-rows-[auto_1fr_auto] h-full w-full gap-4">
                                        <div className="flex flex-col w-full gap-2">
                                            <Label htmlFor="txtName">Nome da equipe</Label>
                                            <Input {...register("name")} maxLength={255} className="text-sm" placeholder="Nome da equipe" type="text" id="txtName" />
                                            <Input className="hidden" {...register("enterpriseId")} value={user?.enterpriseId}/>
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
                                    {usePermission({ minPermission: PermissionsRoles.GERENT }) && <Button disabled={isSubmitting} type="submit" className="bg-(--weakGreen) w-full lg:w-42 text-[#135C04] hover:bg-[#3eff0090] cursor-pointer">{isSubmitting && <Loader/>}{action === EAction.CREATE ? "Cadastrar" : "Atualizar"}</Button>}
                                    <Link to="/Listagem/Teams">
                                        <Button disabled={isSubmitting} variant={"destructive"} type="submit" className="w-full lg:w-42 cursor-pointer">{isSubmitting && <Loader/>}Voltar</Button>
                                    </Link>
                                </div>

                            </form>
                        )
                }

            </ScrollArea>
        </div>
    )
}