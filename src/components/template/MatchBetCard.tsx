import OddSquareSize from "../../../functions/marketsOddsSize"
import useTicket from "../../data/hooks/useTicket"
import OddSquare from "./OddSquare"

interface MatchBetCardProps {
    event: any,
    market: any,
    live?: boolean
}

export default function MatchBetCard(props: MatchBetCardProps) {

    return (
        <div className={`w-full mb-4 p-2 flex flex-col rounded-lg bg-gray-200 dark:bg-gray-800
        ${props.live && "border-2 border-red-500"}`}>
            <h1>{props.market.name}</h1>
            <div className={`flex flex-wrap`}>
                {props.market.selections.map(selection => {
                    if (props.live) {
                        const ctx = useTicket()
                        ctx.ticket.guesses.forEach(guess => {
                            if (guess.selection_id === +selection.id) guess.price = selection.price
                        })
                    }
                    return <OddSquare event={props.event} market={props.market} key={selection.id} marketType={props.market.type} size={props.market.selections.length > 3 ? "half" : "grow"} selection={selection} />
                })}
            </div>
        </div>
    )
}