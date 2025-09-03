import { useNavigate } from "react-router";

export default function HeaderCardTab({tabUrl} : {tabUrl: string}){
    const navigate = useNavigate();
    // {tabUrl !== "/Home" && tabUrl.split("/").at(-1)}

    return (
        <div onClick={() => navigate(tabUrl)}>
            
        </div>
    )
}