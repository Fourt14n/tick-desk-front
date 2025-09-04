import { Outlet } from "react-router";
import FixedLayout from "../FixedLayout/FixedLayout"

export default function Layout(){
    return (
        <div className="w-full h-dvh">
            <FixedLayout TelaAtual={<Outlet/>}/>
        </div>
    )
}