import { Link } from "react-router"

type Infos = {
    ticket: TicketInfos,
    eraserFunc: (event : any) => void
}

type TicketInfos = {
    title: string,
    callNumber: string
}

export default function Searching({ ticket, eraserFunc }: Infos) {
    return (
        <Link to={`/Ticket/${ticket.callNumber}`} onClick={eraserFunc} className="flex flex-col border-1 border-black-50 gap-2 p-3 w-full">
            <div>
                <strong>
                    {ticket.callNumber}
                </strong>
            </div>
            <div className="truncate">
                {ticket.title}
            </div>
        </Link>
    )
}