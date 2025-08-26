import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

export default function Router(){
    return (
        <Routes>
            <Route element={<Login/>} path="" />
            <Route element={<Home/>} path="/teste"/>
        </Routes>
    )
}