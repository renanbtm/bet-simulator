import { useState } from "react"
import { selectedOdds } from "../../../functions/selectedOdds"
import useTicket from "../../data/hooks/useTicket"
import Guess from "../../model/Guess"

interface OddSquareProps {
    event: any,
    market: any,
    selection: any,
    marketType: string,
    size: "small" | "medium" | "large" | "grow" | "half"
}

export default function OddSquare(props: OddSquareProps) {

    const ctx = useTicket()
    const [selected, setSelected] = useState<boolean>(selectedOdds.includes(props.selection.id))

    function sizeStyles() {
        if (props.size === "small") return { width: "6rem" }
        else if (props.size === "grow") return { flexGrow: 1 }
        else if (props.size === "half") return { width: "49%" }
    }

    function toggleSelection() {
        if (!selected) {
            setSelected(true)
            selectedOdds.push(props.selection.id)
            ctx.ticket.addGuess(new Guess(
                props.event.id ? +props.event.id : +props.event.eventId,
                props.event.name ? props.event.name : `${props.event.teams[0]} X ${props.event.teams[1]}`,
                +props.market.id,
                props.market.name,
                +props.selection.id,
                props.selection.fullName ? props.selection.fullName : props.selection.name,
                props.selection.price,
                () => {
                    setSelected(false)
                }))
        } else {
            setSelected(false)
            selectedOdds.splice(selectedOdds.indexOf(props.selection.id), 1)
            ctx.ticket.removeGuess(new Guess(
                props.event.id ? +props.event.id : +props.event.eventId,
                props.event.name ? props.event.name : `${props.event.teams[0]} X ${props.event.teams[1]}`,
                +props.market.id,
                props.market.name,
                +props.selection.id,
                props.selection.fullName ? props.selection.fullName : props.selection.name,
                props.selection.price,
                () => {
                    setSelected(false)
                }))
        }
    }

    return (
        <div className={`flex justify-center items-center m-1 p-1 rounded-md
                            bg-gray-300 dark:bg-gray-600 cursor-pointer ${selected && "bg-yellow-500"} dark:${selected && "bg-yellow-500"}`}
            style={sizeStyles()} onClick={toggleSelection}>
            {props.selection.shortName ?
                <div className={`flex items-center`}>
                    {
                        /\d/.test(props.selection.shortName) || /\w/.test(props.selection.shortName) ?
                            <span className={`text-xs mr-2`}>{props.selection.shortName}  </span> :
                            <span className={`text-xs mr-2`}>{props.selection.shortName}{props.selection.handicap}  </span>
                    }
                    <span className={`text-indigo-600 dark:text-indigo-400 text-lg`}>{props.selection.price.toFixed(2)}</span>
                </div> :
                <div className={`flex items-center`}>
                    {!["HTOH", "H2HT", "H2H1"].includes(props.marketType) && <span className={`text-xs mr-2`}>{props.selection.name}  </span>}
                    <span className={`text-indigo-600 dark:text-indigo-400 text-lg`}>{props.selection.price.toFixed(2)}</span>
                </div>
            }
        </div>
    )
}

// return (
//     <div className={`flex justify-center items-center m-1 rounded-md ${sizeClasses()}
//                         bg-gray-300 dark:bg-gray-600 cursor-pointer`}>
//         {props.selection.shortName ?
//             <div className={`flex items-center`}>
//                 {/\d/.test(props.selection.shortName) || /\w/.test(props.selection.shortName) ?
//                     <span className={`text-xs mr-2`}>{props.selection.shortName}  </span> :
//                     <span className={`text-xs mr-2`}>{props.selection.shortName}{props.selection.handicap}  </span>
//                 }
//                 <span className={`text-indigo-600 dark:text-indigo-300 text-lg`}>{props.selection.price.toFixed(2)}</span>
//             </div> :
//             props.selection.name.length > 1 ?
//                 <span className={`text-indigo-600 dark:text-indigo-300 text-lg`}>{props.selection.price.toFixed(2)}</span> :
//                 <div className={`flex items-center`}>
//                     <span className={`text-xs mr-2`}>{props.selection.name}  </span>
//                     <span className={`text-indigo-600 dark:text-indigo-300 text-lg`}>{props.selection.price.toFixed(2)}</span>
//                 </div>
//         }
//     </div>
// )