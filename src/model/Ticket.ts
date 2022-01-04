import Guess from "./Guess";

export default class Ticket {
    guesses: Guess[]
    multipleEnabled: boolean
    blockingMultiples: number[]

    constructor() {
        this.guesses = []
        this.multipleEnabled = true
        this.blockingMultiples = []
    }

    get totalGuesses() {
        return this.guesses.length
    }

    get multipleOdd() {
        var odd = 1
        this.guesses.forEach(g => odd *= g.price)
        return this.multipleEnabled ? odd : 0
    }

    addGuess(guess: Guess) {
        this.guesses.push(guess)
        this.blockingMultiples = []
        var eventsIds = []
        this.guesses.forEach(g => {
            if (eventsIds.includes(g.event_id)) {
                this.guesses.forEach(G => {
                    if (G.event_id === g.event_id) this.blockingMultiples.push(G.id)
                })
            }
            eventsIds.push(g.event_id)
        })
        this.multipleEnabled = this.blockingMultiples.length === 0
    }

    removeGuess(guess: Guess) {
        // Find event index to delete
        var index = -1
        this.guesses.forEach((g, i) => {
            if (g.event_id === guess.event_id && g.market_id === guess.market_id && g.selection_id === guess.selection_id) {
                index = i
            }
        })
        if (index >= 0) this.guesses.splice(index, 1)

        // check for collision removal
        this.blockingMultiples = []
        var eventsIds = []
        this.guesses.forEach(g => {
            if (eventsIds.includes(g.event_id)) {
                this.guesses.forEach(G => {
                    if (G.event_id === g.event_id) this.blockingMultiples.push(G.id)
                })
            }
            eventsIds.push(g.event_id)
        })
        this.multipleEnabled = this.blockingMultiples.length === 0
    }
}