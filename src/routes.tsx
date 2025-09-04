import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";

export default function Router(){
    return (
        <Routes>
            <Route element={<Login/>} path="" />
            
            <Route path="/home" element={<Layout/>}>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
    )
}