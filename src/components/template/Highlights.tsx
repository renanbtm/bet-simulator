import axios from "axios"
import { useEffect, useState } from "react"
import OddSquare from "./OddSquare"
import Link from "next/link"
import { calendarIcon, liveIcon, refreshIcon } from "../icons"
import styles from "../../styles/Highlights.module.css"
import getTimeFromSeconds from "../../../functions/secondsToTime"

export default function Highlights() {

    const [highlights, setHighlights] = useState([])
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        async function loadHighLights() {
            var response = await axios.get("https://br.betano.com/")
            var data = String(response.data)
            var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
            data = data.slice(start)
            var end = data.indexOf("</script>")
            var jsonString = data.slice(0, end)
            var jsonData = JSON.parse(jsonString)
            var hl = []
            jsonData.structureComponents.betsofday.data.betsOfDay.forEach(bet => {
                if (bet.type === 1) hl.push(bet)
            })
            setHighlights(hl)
            setRefresh(false)
        }
        loadHighLights()
    }, [refresh])

    return (
        highlights.length > 0 &&
        <div>
            <div className={`w-full flex items-center justify-end pr-3 mb-2`}>
                <button onClick={() => setRefresh(true)} className={`flex items-center rounded-full bg-gray-300 dark:bg-gray-800 p-2`}>
                    {refreshIcon}
                    <span className={`ml-2 text-sm`}>Placar ao vivo</span>
                </button>
            </div>
            <div className={`flex h-56`}>
                {highlights.map(highlight => {
                    return (
                        <div key={highlight.url} className={`w-1/3 m-2`} style={{ backgroundImage: `url(${highlight.eventImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                            <div className={`flex relative flex-col p-3 bg-gray-700 bg-opacity-60 w-full h-full`}>
                                {highlight.isLiveNow ?
                                    <div className={`${styles.live}`}>
                                        {liveIcon}
                                        <span className={`ml-2 mr-2 text-sm`}>LIVE</span>
                                        <span className={`${styles.time}`}>{getTimeFromSeconds(highlight.liveData.clock.secondsSinceStart, highlight.sportId)}</span>
                                        <span className={`${styles.result}`}>{highlight.liveData.score.home} - {highlight.liveData.score.away}</span>
                                    </div> :
                                    <div className={`absolute flex items-center left-1 top-0 text-white p-1`}>
                                        {calendarIcon}
                                        <span>&nbsp;{new Date(highlight.startTime).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}&nbsp;-&nbsp; </span>
                                        <span>{new Date(highlight.startTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                                    </div>
                                }
                                <Link href={highlight.url}>
                                    <a className={`flex flex-1 justify-between items-center p-2 text-white cursor-pointer`}>
                                        <span>{highlight.teams[0]}</span>
                                        <span>X</span>
                                        <span>{highlight.teams[1]}</span>
                                    </a>
                                </Link>
                                <div className={`flex items-center justify-center text-white`}>
                                    <span>{highlight.market.name}</span>
                                </div>
                                <div className={`flex justify-between items-center`}>
                                    {highlight.market.selections.map(selection => {
                                        return <OddSquare key={selection.id + "highlight"} event={highlight} market={highlight.market} marketType={highlights[0].market.type} size="grow" selection={selection} />
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
