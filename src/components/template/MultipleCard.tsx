import { useEffect, useState } from "react"
import useAuth from "../../data/hooks/useAuth"
import useTicket from "../../data/hooks/useTicket"
import styles from "../../styles/MultipleCard.module.css"

export default function MultipleCard() {

    const [moneyValue, setMoneyValue] = useState<number>(0)

    const ctx = useTicket()
    const ctxAuth = useAuth()

    return (
        <div className={`border-2 border-gray-400 dark:border-gray-500`}>
            <div className={`p-2 bg-gray-400 dark:bg-gray-500`}>
                {
                    ctx.ticket.multipleEnabled ?
                        <span className={`text-sm`}>MÚLTIPLAS | {ctx.ticket.totalGuesses} SELEÇÕES</span> :
                        <span className={`text-xs`}>MÚLTIPLAS | Seleções não permitidas</span>
                }
            </div>
            <div className={`flex flex-col p-2`}>
                <div className={`flex justify-between`}>
                    <span>Odd Múltipla</span>
                    <span className={`text-xl font-bold`}>{ctx.ticket.multipleOdd.toFixed(2)}</span>
                </div>
                <div className={`flex items-center`}>
                    <span className={`flex-1`}>Valor</span>
                    <span className={`mr-1`}>R$</span>
                    <input className={`w-20 p-1 rounded-md ${styles.inputColor}`} type="number" placeholder="0,00" min={0} max={10000}
                        value={moneyValue} onChange={(e) => setMoneyValue(+e.target.value)} />
                </div>
                <hr className={`border-gray-400 dark:border-gray-500 mt-2 mb-1`} />
                <div className={`flex justify-between`}>
                    <span className={`text-sm`}>Ganhos potenciais</span>
                    <span>R$ {moneyValue > 0 ? (ctx.ticket.multipleOdd * moneyValue).toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "0,00"}</span>
                </div>
                <div className={`flex mt-4 mb-2`}>
                    <button className={`flex-1 p-2 rounded-sm 
                    ${moneyValue < 1 || !ctx.ticket.multipleEnabled || !ctxAuth.user ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"}`} disabled={moneyValue < 1 || !ctx.ticket.multipleEnabled || !ctxAuth.user}
                        onClick={() => ctxAuth.user.makeBet(ctx.ticket.guesses, moneyValue, ctx.clear)}>
                        APOSTE JÁ {moneyValue >= 1 && `R$${moneyValue.toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 })}`}
                    </button>
                </div>
            </div>
        </div>
    )
}