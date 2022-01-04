import { selectedOdds } from "../../functions/selectedOdds"
import firebase from "../firebase/config"
import Guess from "./Guess"

interface TransfersInterface {
    date: any,
    value: number,
    action: "deposit" | "withdraw"
}

interface GuessInterface {
    id: number,
    event_id: number,
    event_name: string,
    market_id: number,
    market_name: string,
    selection_id: number,
    selection_name: string
}

interface BetsInterface {
    odd: number,
    value: number,
    date: any,
    guesses: GuessInterface[],
    status: string,
    returns: number
}

export default class User {
    uid: string
    email: string
    name: string
    token: string
    loginMethod: string
    imageUrl: string
    balance: number
    bets: BetsInterface[]
    transfers: TransfersInterface[]

    constructor(uid: string, email: string, name: string, token: string, loginMethod: string, imageUrl: string, balance: number,
        bets: BetsInterface[], transfers: []) {
        this.uid = uid
        this.email = email
        this.name = name
        this.token = token
        this.loginMethod = loginMethod
        this.imageUrl = imageUrl
        this.balance = balance
        this.bets = bets
        this.transfers = transfers
    }

    async depositMoney(value: number) {
        this.balance += value
        this.transfers.push({ date: new Date(), value: value, action: "deposit" })
        await firebase.firestore().collection("users").doc(this.uid).update({
            balance: this.balance,
            transfers: this.transfers
        })
    }

    async withdraw(value: number) {
        if (value > 1 && value <= this.balance) {
            this.balance -= value
            this.transfers.push({ date: new Date(), value: value, action: "withdraw" })
            await firebase.firestore().collection("users").doc(this.uid).update({
                balance: this.balance,
                transfers: this.transfers
            })
        } else {
            alert("Algo deu errado com o seu saque.")
        }
    }

    async makeBet(selections: Guess[], value: number, clearFunction: () => void) {

        if (value > 1 && value <= this.balance) {
            this.balance -= value
            if (selections.length > 1) { // Multiple bets
                var odd = 1
                selections.forEach(g => odd *= g.price)
                var guesses = []
                selections.forEach(sel => {
                    guesses.push({
                        id: sel.id,
                        event_id: sel.event_id,
                        event_name: sel.event_name,
                        market_id: sel.market_id,
                        market_name: sel.market_name,
                        selection_id: sel.selection_id,
                        selection_name: sel.selection_name
                    })
                })
                this.bets.push({ odd, value, date: new Date(), guesses, status: null, returns: null })
            } else {
                var guesses = []
                selections.forEach(sel => {
                    guesses.push({
                        id: sel.id,
                        event_id: sel.event_id,
                        event_name: sel.event_name,
                        market_id: sel.market_id,
                        market_name: sel.market_name,
                        selection_id: sel.selection_id,
                        selection_name: sel.selection_name
                    })
                })
                this.bets.push({ odd: selections[0].price, value, date: new Date(), guesses, status: null, returns: null })
            }
            try {
                await firebase.firestore().collection("users").doc(this.uid).update({
                    balance: this.balance,
                    bets: this.bets
                })
                clearFunction()
                selectedOdds.length = 0
            } catch {
                alert("Ocorreu algum erro")
            }
        } else {
            alert("Saldo insuficiente")
        }
    }

    async updateBetStatus(index: number, status: string, returns: number) {
        this.bets[index].status = status
        this.bets[index].returns = returns
        try {
            await firebase.firestore().collection("users").doc(this.uid).update({
                bets: this.bets
            })
        } catch {
            alert("Ocorreu algum erro")
        }
    }
}