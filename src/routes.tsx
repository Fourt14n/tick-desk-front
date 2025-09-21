import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Ticket from "./pages/Ticket/Ticket";
import Listagem from "./pages/Listagem/Listagem";

export default function Router(){
    return (
        <Routes>
            <Route index element={<Login/>} path="/Login" />
            
            <Route path="/" element={<Layout/>}>
                <Route path="Home/" index element={<Home/>}/>
                <Route path="Ticket/:id" element={<Ticket/>}/>
                <Route path="Listagem/:tipo" element={<Listagem/>}/>
            </Route>
        </Routes>
    )
}