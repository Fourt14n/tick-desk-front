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
    let user : TokenReturn = {email: "", exp: 1, id: 0, name: "", role: ""}
    if(token === "" || token === null)
        DisconnectUser();
    else
        user = jwtDecode(token) as TokenReturn;


    return user;
}