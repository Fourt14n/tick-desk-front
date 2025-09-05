import { Clock } from "@/components/HomeClock/HomeClock";

export default function Home(){
    return (
        <div className="w-full h-full px-14">
            <div className="flex justify-between w-full py-20">
                <p className="text-(--grey) font-bold text-2xl">{`Seja bem-vindo(a), Hebert`}</p>

                <Clock/>
            </div>
            <div className="flex">
                
            </div>
        </div>
    )
}