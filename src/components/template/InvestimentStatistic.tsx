import { useEffect, useState } from "react"

interface TransfersInterface {
    date: any,
    value: number,
    action: "deposit" | "withdraw"
}

interface InvestimentStatisticProps {
    transfers: TransfersInterface[],
    balance: number,
    unsolvedBets: number
}

export default function InvestimentStatistic(props: InvestimentStatisticProps) {

    const [totalDeposit, setTotalDeposit] = useState<number>(0)
    const [totalWithdraw, setTotalWithdraw] = useState<number>(0)
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        var deposit = 0
        var withdraw = 0
        props.transfers.forEach(t => {
            t.action === "deposit" ? deposit += t.value : withdraw += t.value
        })
        setTotalDeposit(deposit)
        setTotalWithdraw(withdraw)
        setBalance(props.balance)
    }, [])

    return (
        <div>
            <h2>Dinheiro investido</h2>
            {props.transfers.length === 0 ?
                <p>Você ainda não aportou nenhuma quantia para apostar</p> :
                <div>
                    <p>Você já depositou <span className="font-bold">R$ {totalDeposit.toFixed(2)}</span></p>
                    <p>Possui um saldo no site de <span className="font-bold">R$ {balance.toFixed(2)}</span></p>
                    <p>Já sacou <span className="font-bold">R$ {totalWithdraw.toFixed(2)}</span></p>
                </div>
            }
            {props.transfers.length !== 0 && <div>
                <div>
                    {totalWithdraw + balance > totalDeposit ?
                        (
                            <div>
                                <p className={`text-lg bg-green-800 text-green-200 p-2`}>Você está no lucro</p>
                                <p>No momento seu lucro é de {((((totalWithdraw + balance) / totalDeposit) - 1) * 100).toFixed(2)}%</p>
                                {totalWithdraw < totalDeposit && <p>Você já depositou R${totalDeposit.toFixed(2)} e já retirou de volta para
                                    seu bolso R${totalWithdraw.toFixed(2)} ({((totalWithdraw / totalDeposit) * 100).toFixed(2)}%). Considere
                                    fazer novos saques para garantir o retorno do valor investido e continuar apostando apenas
                                    com o dinheiro já lucrado. </p>}
                                {totalWithdraw === totalDeposit && <p>Você já depositou R${totalDeposit.toFixed(2)} e já retirou de volta para
                                    seu bolso R${totalWithdraw.toFixed(2)} ({((totalWithdraw / totalDeposit) * 100).toFixed(2)}%). Muito bem,
                                    você já recuperou o seu investimento e agora pode continuar apostando apenas com seus lucros. </p>}
                                {totalWithdraw > totalDeposit && <p>Você já depositou R${totalDeposit.toFixed(2)} e já retirou de volta para
                                    seu bolso R${totalWithdraw.toFixed(2)} ({((totalWithdraw / totalDeposit) * 100).toFixed(2)}%). Parece que
                                    você está indo muito bem, já tem seguro de volta em seu bolso mais do que o valor inicialmente
                                    investido. Continue assim. </p>}
                            </div>
                        ) :
                        totalWithdraw + balance < totalDeposit ?
                            (
                                <div>
                                    <p className={`text-lg bg-red-800 text-red-200 p-2`}>Você está no prejuízo</p>
                                    <p>No momento seu prejuízo é de {(((totalDeposit - (totalWithdraw + balance)) / totalDeposit) * 100).toFixed(2)}%.
                                        {props.unsolvedBets > 0 && ` Ainda tem ${props.unsolvedBets} aposta(s) para ser(em) definida(s)`}
                                    </p>
                                </div>
                            ) :
                            (
                                <p>Você está empatado, nem lucro nem prejuízo</p>
                            )
                    }
                </div>
            </div>}
        </div>
    )
}