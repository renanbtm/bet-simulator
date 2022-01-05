import Layout from "../components/template/Layout";
import useAuth from "../data/hooks/useAuth";
import LeagueTitle from "../components/template/LeagueTitle"
import { useEffect, useState } from "react";
import Link from "next/link"
import DepositModal from "../components/template/DepositModal"
import WithdrawModal from "../components/template/WithdrawModal";
import { checkIcon, xIcon } from "../components/icons";
import InvestimentStatistic from "../components/template/InvestimentStatistic";

export default function Profile() {

    const ctx = useAuth()

    const [showDepositModal, setShowDepositModal] = useState(false)
    const [showWithdrawModal, setShowWithdrawModal] = useState(false)
    const [unsolvedBets, setUnsolvedBets] = useState<number>(null)

    useEffect(() => {
        var unsolveds = 0
        if (ctx.user) {
            ctx.user.bets.forEach(bet => {
                if (!bet.status) unsolveds += 1
            })
        }
        setUnsolvedBets(unsolveds)
    }, [unsolvedBets])

    function unsolvedBetsAmount() {
        var counter = 0
        ctx.user.bets.forEach(bet => {
            if (!bet.status) counter += 1
        })
        return counter
    }

    return (
        ctx.user ?
            <Layout titulo={ctx.user.name} subtitulo={ctx.user.email}>
                <div className={`flex items-center`}>
                    <span className={`flex-1 text-xl font-bold`}>SALDO: R${ctx.user.balance.toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                    <div className={`w-2/3`}>
                        <button className={`border rounded-md bg-green-500 p-3`} style={{ width: "48%", margin: "1%" }}
                            onClick={() => { setShowDepositModal(true) }}>DEPOSITAR</button>
                        <button className={`border rounded-md bg-red-500 p-3`} style={{ width: "48%", margin: "1%" }}
                            onClick={() => { setShowWithdrawModal(true) }}>SACAR</button>
                    </div>
                </div>

                <div className={`mt-10`}>
                    <LeagueTitle name="Histórico de depósitos/retiradas" />
                    <div className={`border h-60 border-t-0 p-1 overflow-scroll`}>
                        {ctx.user.transfers.length > 0 ?
                            <ul>
                                {ctx.user.transfers.map(transfer => {
                                    return (
                                        <li key={transfer.date.seconds}
                                            className={`flex justify-between text-black rounded-md py-2 px-4 my-1 ${transfer.action === "deposit" ? "bg-green-300" : "bg-red-300"}`}>
                                            <span>
                                                {transfer.action === "deposit" ? "+ R$ " : "- R$ "}
                                                {transfer.value}
                                            </span>
                                            <span>
                                                {new Date(transfer.date.seconds * 1000).toLocaleString("pt-BR")}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul> :
                            <span>Nenhum deposito ou saque realizado</span>
                        }
                    </div>
                </div>

                <div className={`mt-10`}>
                    <LeagueTitle name="Histórico de apostas" />
                    <div className={`border border-t-0 p-2 overflow-scroll`} style={{ height: "900px" }}>
                        {ctx.user.bets.length > 0 ?
                            <ul>
                                {ctx.user.bets.map((bet, index) => {
                                    return (
                                        <div className={`flex`} key={bet.date}>
                                            <li key={bet.date.seconds} className={`flex-1 flex flex-col border border-gray-400 dark:border-white rounded-md p-2 mb-2`}>
                                                <div className={`flex`}>
                                                    <div className={`flex items-center justify-center w-1/12`}>
                                                        <span>Data</span>
                                                    </div>
                                                    <div className={`flex items-center justify-center w-8/12`}>
                                                        <span>Palpites</span>
                                                    </div>
                                                    <div className={`flex items-center justify-center w-1/12`}>
                                                        <span>Odd</span>
                                                    </div>
                                                    <div className={`flex items-center justify-center w-1/12`}>
                                                        <span>Valor</span>
                                                    </div>
                                                    <div className={`flex items-center justify-center w-1/12`}>
                                                        <span>Retorno</span>
                                                    </div>
                                                </div>

                                                <div className={`flex items-center`}>
                                                    <div className={`flex flex-col items-center w-1/12`}>
                                                        <span>{new Date(bet.date.seconds * 1000).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span>
                                                        <span>{new Date(bet.date.seconds * 1000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                                                    </div>

                                                    <div className={`flex items-center w-8/12 flex-wrap`}>
                                                        {bet.guesses.map(guess => {
                                                            return <div key={guess.id + bet.date} className={`border border-gray-400 dark:border-white m-1 p-1 bg-gray-100 dark:bg-gray-700 flex flex-col text-sm`}
                                                                style={{ width: "31%", margin: "1%" }}>
                                                                <span className={`text-center italic mb-1`}>{guess.market_name}</span>
                                                                <div className={`flex flex-col flex-1 justify-center items-center`}>
                                                                    <span className={`flex items-center text-xs`}>{guess.event_name}</span>
                                                                    <span className={`flex items-center font-bold`}>{guess.selection_name}</span>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div>

                                                    <div className={`flex flex-col items-center w-1/12`}>
                                                        <span className={`font-bold`}>{bet.odd.toFixed(2)}</span>
                                                    </div>

                                                    <div className={`flex flex-col items-center w-1/12`}>
                                                        <div className={`border-2 border-blue-600 rounded-full w-20 h-20 flex items-center justify-center`}>
                                                            <span className={`font-bold text-xs`}>R${bet.value.toFixed(2)}</span>
                                                        </div>
                                                    </div>

                                                    <div className={`flex flex-col items-center w-1/12`}>
                                                        <div className={`border-2 rounded-full w-20 h-20 flex items-center justify-center
                                                        ${bet.status === "w" ? "border-green-600" : bet.status === "l" ? "border-red-600" : "border-gray-400"}`}>
                                                            <span className={`font-bold text-xs`}>{bet.status ? `R$${bet.returns.toFixed(2)}` : "?"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            {!bet.status &&
                                                <div className={`flex flex-col items-center justify-around p-1`}>
                                                    <button onClick={() => {
                                                        ctx.user.updateBetStatus(index, "w", bet.value * bet.odd)
                                                        setUnsolvedBets(unsolvedBets - 1)
                                                    }} className={`border rounded-full border-green-600`}>{checkIcon}</button>
                                                    <button onClick={() => {
                                                        ctx.user.updateBetStatus(index, "l", 0)
                                                        setUnsolvedBets(unsolvedBets - 1)
                                                    }} className={`border rounded-full border-red-600`}>{xIcon}</button>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </ul> :
                            <span>Nenhum aposta realizada</span>
                        }
                    </div>
                </div>

                <div className={`mt-10`}>
                    <LeagueTitle name="Estatísticas" />
                    <div className={`border h-96 border-t-0 p-4 overflow-scroll`}>
                        <InvestimentStatistic transfers={ctx.user.transfers} balance={ctx.user.balance} unsolvedBets={unsolvedBetsAmount()} />
                    </div>
                </div>

                {showDepositModal && <DepositModal toggleModal={setShowDepositModal} />}
                {showWithdrawModal && <WithdrawModal toggleModal={setShowWithdrawModal} />}
            </Layout> :
            <div className={`w-screen h-screen flex flex-col items-center justify-center`}>
                <h1 className={`text-6xl my-5`}>404 - Page not found</h1>
                <p className={`text-xl my-5`}>Você precisa acessar a sua conta antes.</p>
                <Link href="/">Ir para a página inicial</Link>
            </div>
    )
}