import { createContext, useState } from "react";
import Guess from "../../model/Guess";
import Ticket from "../../model/Ticket";

interface TicketContextProps {
    ticket: Ticket,
    clear: () => void
}

const TicketContext = createContext<TicketContextProps>(undefined)

export function TicketProvider(props) {

    const [ticket, setTicket] = useState<Ticket>(new Ticket())

    function clear() {
        ticket.guesses.forEach(guess => guess.unselectCallback())
        setTicket(new Ticket())
    }

    return (
        <TicketContext.Provider value={{
            ticket, clear
        }}>
            {props.children}
        </TicketContext.Provider>
    )
}

export default TicketContext