import { useEffect, useState } from "react"
import { selectedOdds } from "../../../functions/selectedOdds"
import useAuth from "../../data/hooks/useAuth"
import useTicket from "../../data/hooks/useTicket"
import MultipleCard from "./MultipleCard"
import TicketCard from "./TicketCard"

export default function MenuLateralDireito() {

    const [tab, setTab] = useState<0 | 1>(0)
    const ctx = useTicket()
    const ctxAuth = useAuth()
    const [_, setTime] = useState(Date.now());

    // TODO Arrumar essa gambiarra
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 500);
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <aside>
            <div className={`w-72 h-full p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white`}>
                <div className={`flex justify-around mb-2`}>
                    <span onClick={() => setTab(0)} className={`text-sm cursor-pointer ${tab === 0 && "border-b-2 border-black dark:border-white font-bold"}`}>TICKET DE APOSTA</span>
                    <span onClick={() => setTab(1)} className={`text-sm cursor-pointer ${tab === 1 && "border-b-2 border-black dark:border-white font-bold"}`}>MINHAS APOSTAS</span>
                </div>
                {tab === 0 ?
                    ctx.ticket.guesses.length === 0 ?
                        <div className={`w-full h-20 bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
                            <span className={`text-sm`}>Nunhuma aposta selecioanda</span>
                        </div> :
                        <div>
                            <button className={`w-full mb-2 mt-2 p-3 bg-gray-400 dark:bg-gray-500`}
                                onClick={() => {
                                    ctx.clear()
                                    selectedOdds.length = 0
                                }}>
                                Limpar
                            </button>
                            {ctx.ticket.guesses.map(guess => {
                                return <TicketCard key={guess.id} selection={guess}
                                    blocking={ctx.ticket.blockingMultiples.includes(guess.id)} />
                            })}
                        </div> :
                    (
                        !ctxAuth.user ?
                            <div className={`w-full h-20 bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
                                <span className={`text-sm`}>Faça login para ver suas apostas</span>
                            </div> :
                            ctxAuth.user.bets.map(bet => {
                                return !bet.status ?
                                    <div className="flex flex-col border border-black dark:border-white my-2">
                                        <div className={`flex justify-between border-b border-black dark:border-white`}>
                                            <span className={`px-2 py-1`}>R$ {bet.value.toFixed(2)}</span>
                                            <span className={`px-2 py-1`}>x{bet.odd.toFixed(2)}</span>
                                        </div>
                                        {bet.guesses.map(guess => {
                                            return < div key={guess.id + bet.date} className={`w-full border-black dark:border-white bg-gray-100 dark:bg-gray-700 flex flex-col items-center p-2`}>
                                                <span className={`text-xs italic`}>{guess.market_name}</span>
                                                <span className={`text-xs`}>{guess.event_name}</span>
                                                <span className={`text-sm font-bold`}>{guess.selection_name}</span>
                                            </div>
                                        })}
                                    </div>
                                    : null
                            })
                    )
                }
                {ctx.ticket.guesses.length >= 2 && <div>
                    <MultipleCard />
                </div>}
            </div>
        </aside >
    )
}