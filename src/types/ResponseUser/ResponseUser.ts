import type { PermissionsRoles } from "@/hooks/usePermission"
import type { ResponseTeams } from "../ResponseTeams/ResponseTeams"

export type ResponseUser = {
    email: string,
    id: number,
    name: string,
    role: PermissionsRoles,
    team: ResponseTeams,
    username: string
}