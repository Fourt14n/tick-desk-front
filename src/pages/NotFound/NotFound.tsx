import { useNavigate } from "react-router";

export function NotFound(){
    const navigate = useNavigate();
    const token = sessionStorage.getItem("Token_TickDesk");
    if(!token)
        setTimeout(() => navigate("/Login"), 3000);
    else
        setTimeout(() => navigate("/Home"), 3000);

    return(
        <div>
            <h1>Página não encontrada, redirecionando...</h1>
        </div>
    )
}