import Link from "next/link"
import EmptyOddSquare from "./EmptyOddSquare"
import OddSquare from "./OddSquare"

interface EventCardProps {
    event: any,
    marketTypes?: string[],
    selectionsSizes?: number[]
}

export default function EventCard(props: EventCardProps) {

    const date = new Date(props.event.startTime)

    return (
        <div className={`flex p-1 mt-2`}>
            <div className={`flex flex-col w-16`}>
                <span>{date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span>
                <span>{date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>

            <div className={`border-r-2 mr-4 dark:border-gray-600`}></div>

            <Link href={props.event.url} passHref>
                <div className={`flex flex-1 flex-col cursor-pointer`}>
                    {props.event.participants.map(participant => {
                        return <span key={props.event.id + participant.name}>{participant.name}</span>
                    })}
                </div>
            </Link>

            <div className={`flex flex-1 justify-end`}>
                {props.marketTypes ?
                    props.marketTypes.map((marketOnList, index) => {
                        var includes = false
                        props.event.markets.forEach(market => {
                            if (market.type === marketOnList) includes = true
                        })
                        if (includes) {
                            return props.event.markets.map(market => {
                                return market.type === marketOnList && market.selections.length < 4 && market.selections.map(selection => {
                                    return <OddSquare event={props.event} market={market} key={selection.id} marketType={market.type} selection={selection}
                                        size={props.event.totalMarketsAvailable > 1 ? "small" : "grow"} />
                                })
                            })
                        } else {
                            return [...Array(props.selectionsSizes[index])].map((_, index) => <EmptyOddSquare key={index} />)
                        }
                    }) :
                    props.event.markets.map(market => {
                        return market.selections.length < 4 && market.selections.map(selection => {
                            return <OddSquare event={props.event} market={market} key={selection.id} marketType={market.type} selection={selection}
                                size={props.event.totalMarketsAvailable > 1 ? "small" : "grow"} />
                        })
                    })
                }
            </div>
        </div>
    )
}

// props.marketTypes.map(marketOnList => {
//     var includes = false
//     props.event.markets.forEach(market => {
//         if (market.type === marketOnList) includes = true
//     })
//     return includes ?
//         props.event.markets.map(market => {
//             return market.type === marketOnList && market.selections.length < 4 && market.selections.map(selection => {
//                 return <OddSquare event={props.event} market={market} key={selection.id} marketType={market.type} selection={selection}
//                     size={props.event.totalMarketsAvailable > 1 ? "small" : "grow"} />
//             })
// })