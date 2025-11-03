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
import RecoveryPassword from "./pages/RecoveryPassword/RecoveryPassword";
import BusinessCreate from "./pages/BusinessCreate/BusinessCreate";
import Business from "./pages/Business/Business";
import ChangePassword from "./pages/RecoveryPassword/ChangePassword";

export default function Router() {
    return (
        <Routes>
            <Route index element={<Login />} path="/Login" />
            <Route element={<RecoveryPassword />} path="/RecuperacaoSenha" />
            <Route element={<ChangePassword />} path="/AlteracaoSenha" />
            <Route element={<PrivateRoute children={<Layout />} />}>
                <Route path="/">
                    <Route path="Home/" index element={<Home />} />
                    <Route path="Ticket/:id" element={<Ticket />} />
                    <Route path="Listagem/:tipo" element={<Listagem />} />
                    <Route path="User/Create" element={<CreateUser action={EAction.CREATE} />} />
                    <Route path="User/:id" element={<CreateUser action={EAction.UPDATE} />} />
                    <Route path="Teams/Create" element={<Team action={EAction.CREATE} />} />
                    <Route path="Teams/:id" element={<Team action={EAction.UPDATE} />} />
                    {/* Pelo fluxo de criação de empresa ser específico, vou diferenciar criação de edição por tela */}
                    <Route path="Business/Create" element={<BusinessCreate/>} />
                    <Route path="Business/:id" element={<Business />} />
                </Route>
            </Route>

            <Route path="*" index element={<NotFound />} />
        </Routes>
    )
}