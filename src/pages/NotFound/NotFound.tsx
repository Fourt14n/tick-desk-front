import { useNavigate } from "react-router";

export function NotFound() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("Token_TickDesk");
    if(!token)
        setTimeout(() => navigate("/Login"), 4000);
    else
        setTimeout(() => navigate("/Home"), 4000);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-[#00FF62] mb-4">404</h1>
                <h2 className="text-2xl font-semiboldmb-2 pb-2">Página não encontrada</h2>
                <p className="text-gray-600 mb-6">A página que você procura não existe.</p>
                <p className="text-gray-500 text-sm">Redirecionando...</p>
            </div>
        </div>
    )
}