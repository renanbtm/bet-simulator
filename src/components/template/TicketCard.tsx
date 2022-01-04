import { useState } from "react";
import Guess from "../../model/Guess";
import { singleArrowIconSmall } from "../icons";
import styles from "../../styles/TicketCard.module.css"
import useAuth from "../../data/hooks/useAuth";
import useTicket from "../../data/hooks/useTicket";

interface TicketCardProps {
    selection: Guess,
    blocking?: boolean
}

export default function TicketCard(props: TicketCardProps) {

    const [moneyValue, setMoneyValue] = useState<number>(0)

    const ctx = useAuth()
    const ctx2 = useTicket()

    return (
        <div className={`p-1 mb-3 w-full bg-gray-100 dark:bg-gray-700 flex flex-col text-sm
        ${props.blocking && "border-l-2 border-red-600"}`}>
            <span className={`text-center font-bold mb-1`}>{props.selection.market_name}</span>
            <div className={`flex items-center flex-1`}>
                <div className={`flex flex-col flex-1`}>
                    <span className={`flex items-center text-xs`}>{props.selection.event_name}</span>
                    <span className={`flex items-center`}>{singleArrowIconSmall}{props.selection.selection_name}</span>
                </div>
                <div>
                    <span className={`mr-2`}>{props.selection.price.toFixed(2)}</span>
                </div>
            </div>
            <div className={`flex items-center mt-2`}>
                <span className={`flex-1`}>Valor</span>
                <span className={`mr-1`}>R$</span>
                <input className={`w-20 p-1 rounded-md ${styles.inputColor}`} type="number" placeholder="0,00" min={0} max={10000}
                    value={moneyValue} onChange={(e) => setMoneyValue(+e.target.value)} />
            </div>
            <div className={`flex justify-between mt-2`}>
                <span className={`text-xs`}>Ganhos potenciais</span>
                <span>R$ {moneyValue > 0 ? (props.selection.price * moneyValue).toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "0,00"}</span>
            </div>
            <div className={`flex mt-2 mb-2`}>
                <button className={`flex-1 rounded-lg 
                    ${moneyValue < 1 || !ctx.user ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"}`} disabled={moneyValue < 1 || !ctx.user}
                    onClick={async () => {
                        await ctx.user.makeBet([props.selection], moneyValue, ctx2.clear)
                    }}>
                    APOSTE JÁ {moneyValue >= 1 && `R$${moneyValue.toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 })}`}
                </button>
            </div>
        </div>
    )
}