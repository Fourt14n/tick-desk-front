import HomeCard from "@/components/HomeCard/HomeCard";
import { Clock } from "@/components/HomeClock/HomeClock";
import useUser, {type TokenReturn } from "@/hooks/useUser";
import { capitalizeFirstWord } from "@/lib/utils";
import { useEffect } from "react";

// Para fins educativos eu vou criar aqui um array do bagulho pra nós ver funcionando
var equipes = [{
    GroupName: "Meus Tickets",
    GroupId: 1,
    Total: 11,
    OpenedToday: 7,
    ExpiresToday: 2,
    Expired: 2
},
{
    GroupName: "Desenvolvimento",
    GroupId: 2,
    Total: 21,
    OpenedToday: 7,
    ExpiresToday: 2,
    Expired: 12
},
{
    GroupName: "TickDesk Sistemas LTDA",
    GroupId: 3,
    Total: 12,
    OpenedToday: 4,
    ExpiresToday: 5,
    Expired: 3
}

]

function PopularHome(){

}

export default function Home() {
    const user = useUser(sessionStorage.getItem("Token_TickDesk") || "");

    useEffect(() => {
        PopularHome();
    }, []);

    return (
        <div className="w-full h-full px-5 md:px-20 bg-(--bg-default)">
            <div className="flex justify-center items-center md:justify-between w-full flex-col md:flex-row py-5 lg:py-10 gap-2 md:gap-0">
                <p className="text-(--grey) font-bold text-xl md:text-xl lg:text-2xl text-center">{`Seja bem-vindo(a), ${capitalizeFirstWord(user.name)}`}</p>

                <Clock />
            </div>
            <div className="flex flex-col gap-5 pb-10 lg:flex-row lg:pb:0 md-pb-5 lg:justify-center lg:items-center xl:justify-between">
                {equipes.map(item => <HomeCard group={item} />)}
            </div>
        </div>
    )
}