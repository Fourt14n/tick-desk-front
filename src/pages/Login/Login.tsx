import { Link, useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();

    function handleLogin(){
        navigate("/Home");
    }

    return (
        <>
            <h1 onClick={handleLogin} className="flex justify-center items-center h-24">Teste</h1>
            <Link to={"/Home"}>Logar</Link>
        </>
    )
}