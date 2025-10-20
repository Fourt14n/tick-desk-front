import { Link } from "react-router"

type Infos = {
    ticket: TicketInfos,
    eraserFunc: () => void
}

type TicketInfos = {
    title: string,
    numberCall: string
}

export default function Searching({ ticket, eraserFunc }: Infos) {
    return (
        <Link to={`/Ticket/${ticket.numberCall}`} onClick={eraserFunc} className="flex flex-col border-1 border-black-50 gap-2 p-3 w-full">
            <div>
                <strong>
                    {ticket.numberCall}
                </strong>
            </div>
            <div className="truncate">
                {ticket.title}
            </div>
        </Link>
    )
}