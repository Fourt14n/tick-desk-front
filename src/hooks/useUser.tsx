import { jwtDecode } from 'jwt-decode';

interface LoggedUser {
    user: TokenReturn;
}

export interface TokenReturn {
    id: number,
    name: string,
    role: string,
    email: string,
}

export default function useUser(token: string): TokenReturn {
    console.log(token)
    const user = jwtDecode(token) as TokenReturn;


    return user;
}