import HomeCard from "@/components/HomeCard/HomeCard";
import { Clock } from "@/components/HomeClock/HomeClock";

export default function Home(){
    return (
        <div className="w-full h-full px-8 md:px-14">
            <div className="flex justify-center items-center md:justify-between w-full flex-col md:flex-row py-5 lg:py-20 gap-2 md:gap-0">
                <p className="text-(--grey) font-bold text-xl md:text-xl lg:text-2xl text-center">{`Seja bem-vindo(a), Hebert`}</p>

                <Clock/>
            </div>
            <div className="flex flex-col gap-10">
                <HomeCard/>
                <HomeCard/>
                <HomeCard/>
            </div>
        </div>
    )
}