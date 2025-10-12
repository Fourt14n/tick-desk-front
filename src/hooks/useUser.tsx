import { jwtDecode } from 'jwt-decode';
import { DisconnectUser } from './useAuth';


export interface TokenReturn {
    id: number,
    name: string,
    role: string,
    email: string,
    exp: number
}

export default function useUser(token: string): TokenReturn {
    if(token === "" || token === null)
        DisconnectUser();

    const user = jwtDecode(token) as TokenReturn;

    return user;
}