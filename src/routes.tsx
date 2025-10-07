import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Ticket from "./pages/Ticket/Ticket";
import Listagem from "./pages/Listagem/Listagem";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { NotFound } from "./pages/NotFound/NotFound";
import CreateUser from "./pages/User/User";
import { EAction } from "./types/EAction/EAction";
import Team from "./pages/Team/Team";

export default function Router(){
    return (
        <Routes>
            <Route index element={<Login/>} path="/Login" />
            <Route path="/" element={<PrivateRoute><Layout/></PrivateRoute>}>
                <Route path="Home/" index element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="Ticket/:id" element={<PrivateRoute><Ticket/></PrivateRoute>}/>
                <Route path="Listagem/:tipo" element={<PrivateRoute><Listagem/></PrivateRoute>}/>
                <Route path="User/Create" element={<PrivateRoute><CreateUser/></PrivateRoute>}/>
                <Route path="User/:id" element={<PrivateRoute><CreateUser action={EAction.UPDATE}/></PrivateRoute>}/>
                <Route path="Teams/Create" element={<PrivateRoute><Team/></PrivateRoute>}/>
                <Route path="Teams/:id" element={<PrivateRoute><CreateUser action={EAction.UPDATE}/></PrivateRoute>}/>
            </Route>
            <Route path="*" index element={<NotFound/>}/>
        </Routes>
    )
}