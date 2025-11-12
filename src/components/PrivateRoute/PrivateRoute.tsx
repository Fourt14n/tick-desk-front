import { validateAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface PrivateRouteType {
    children: React.ReactNode
}

export default function PrivateRoute({children} : PrivateRouteType){
    const navigate = useNavigate();
    const isAuthenticated = validateAuth();
    
    useEffect(() => {
        console.log("Veio autenticar");
        console.log(isAuthenticated);
        
        if(!isAuthenticated) {
            navigate("/Login");
        }
    }, [isAuthenticated]);
    
    // Se não estiver autenticado, não renderiza nada enquanto redireciona
    if(!isAuthenticated) {
        return null;
    }
    
    return <>{children}</>;
}