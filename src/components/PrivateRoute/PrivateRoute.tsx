import { Navigate } from "react-router";

interface PrivateRouteType {
    children: React.ReactNode
}

export default function PrivateRoute({children} : PrivateRouteType){
    const token = sessionStorage.getItem("Token_TickDesk");
    if(!token)
        return <Navigate to="/Login" />
    
    return <>{children}</>
}