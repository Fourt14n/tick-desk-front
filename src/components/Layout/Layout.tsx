import { Outlet } from "react-router";
import Header from "../FixedLayout/FixedLayout"

export default function Layout(){
    return (
        <div className="w-full h-dvh">
            <Header/>
            <Outlet />
        </div>
    )
}