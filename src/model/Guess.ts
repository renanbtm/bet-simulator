export default class Guess {
    id: number
    event_id: number
    event_name: string
    market_id: number
    market_name: string
    selection_id: number
    selection_name: string
    price: number
    unselectCallback: () => void

    constructor(event_id: number, event_name: string, market_id: number, market_name: string, selection_id: number, selection_name: string, price: number, unselectCallback: () => void) {
        this.id = event_id + Date.now()
        this.event_id = event_id
        this.event_name = event_name
        this.market_id = market_id
        this.market_name = market_name
        this.selection_id = selection_id
        this.selection_name = selection_name
        this.price = price
        this.unselectCallback = unselectCallback
    }

}