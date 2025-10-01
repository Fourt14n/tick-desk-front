import useUser from "./useUser";


export enum PermissionsRoles {
    CLIENT,
    SUPORT,
    GERENT,
    ADMIN
}

export type Permission = {
    minPermission: PermissionsRoles,
}

export default function usePermission({ minPermission }: Permission) {
    const token = useUser(sessionStorage.getItem("Token_TickDesk")!);
    const userPermission = PermissionsRoles[token.role as keyof typeof PermissionsRoles];

    if (userPermission >= minPermission)
        return true;
    else
        return false

}   