import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface TicketGroup {
    GroupName: string,
    GroupId: Number,
    Total: Number,
    OpenedToday: Number,
    ExpiresToday: Number,
    Expired: Number
}

interface ReceivingData {
    group: TicketGroup
}

export default function HomeCard({group} : ReceivingData) {
    return (
        <Card className="lg:flex-1 xl:max-w-[31rem]">
            <CardHeader>
                <CardTitle className="text-center flex justify-center items-center flex-col">
                    <p className="cardTitle">{group.GroupName}</p>
                    <Separator className="bg-[#BAB9B9] h-[1px] w-2/3 md:w-1/3 lg:w-2/10 mt-1" orientation="horizontal" />
                </CardTitle>
            </CardHeader>
            <CardContent className="px-3">
                <div className="w-full max-w-full grid gap-2">
                    <div className="topCards grid grid-cols-2 justify-between gap-3">
                        <div className="ticketQtdContainer h-full aspect-[2-1] lg:aspect-square">
                            <div className="flex w-full gap-3 flex-col justify-center items-center">
                                <p className="text-center">Total</p>
                                <div className="quantityTextContainer bg-[#1eff004b]">
                                    <p className="font-bold">{group.Total.toString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="ticketQtdContainer h-full aspect-[2-1] lg:aspect-square">
                            <div className="flex w-full gap-3 flex-col justify-center items-center">
                                <p className="text-center">Abertos hoje</p>
                                <div className="quantityTextContainer bg-[#f6ff0065] text-center">
                                    <p className="font-bold">{group.OpenedToday.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottomCards flex flex-col gap-2">
                        <div className="ticketQtdContainer">
                            <div className="flex w-3/5 gap-3 justify-center items-center">
                                <p className="w-full">Vencem hoje</p>
                            </div>
                            <div className="flex w-2/5 gap-3 justify-center items-center">
                                <div className="quantityTextContainer bg-[#ff80006b]">
                                    <p className="font-bold">{group.ExpiresToday.toString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="ticketQtdContainer">
                            <div className="flex w-3/5 gap-3 justify-center items-center">
                                <p className="w-full">Vencidos</p>
                            </div>
                            <div className="flex w-2/5 gap-3 justify-center items-center">
                                <div className="quantityTextContainer bg-[#ff08008a]">
                                    <p className="font-bold">{group.Expired.toString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}