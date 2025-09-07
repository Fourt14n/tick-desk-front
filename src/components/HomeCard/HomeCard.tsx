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

export default function HomeCard(){
    return (
        <Card className="max-w">
            <CardHeader>
                <CardTitle className="text-center flex justify-center items-center">
                    <p>Desenvolvimento</p>
                    <Separator orientation="horizontal"/>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full grid">
                    <div className="topCards">
                    <div className="ticketQtdContainer">
                        <p>Total</p>
                        <div className="quantityTextContainer">
                            <p>19</p>
                        </div>
                    </div>
                </div>
                <div className="bottomCards">
                    <div className="ticketQtdContainer">
                        <p>Total</p>
                        <div className="quantityTextContainer">
                            <p>19</p>
                        </div>
                    </div>
                    <div className="ticketQtdContainer">
                        <p>Total</p>
                        <div className="quantityTextContainer">
                            <p>19</p>
                        </div>
                    </div>
                </div>
                </div>
            </CardContent>
        </Card>
    )
}