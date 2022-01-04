import axios from "axios";
import { useEffect, useState } from "react";
import { svgLinks } from "../icons/svgLinksMap";
import EventCard from "../template/EventCard";

export default function TopEvents() {

    const [topEvents, setTopEvents] = useState([])
    const [selectedSport, setSelectedSport] = useState("FOOT")

    // const showLabelAbove = ["MR12", "MRES", "BTSC", "HCTG"]

    useEffect(() => {
        async function loadTopEvents() {
            var response = await axios.get("https://br.betano.com/")
            var data = String(response.data)
            var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
            data = data.slice(start)
            var end = data.indexOf("</script>")
            var jsonString = data.slice(0, end)
            var jsonData = JSON.parse(jsonString)
            var topEvents = []
            jsonData.data.topEvents.forEach(topEvent => {
                topEvents.push(topEvent)
            })
            setTopEvents(topEvents)
        }
        loadTopEvents()
    }, [])

    return (
        <div className={`rounded-xl border-2 dark:border-gray-600 p-4`}>
            <div className={`flex justify-start w-full`}>
                {topEvents.map(sport => {
                    return (
                        <button key={sport.id} className={`flex ${selectedSport === sport.id ? "bg-gray-300 dark:bg-gray-800" : ""} rounded-lg p-2 m-2`}
                            onClick={() => setSelectedSport(sport.id)}>
                            <img className={`mr-2`} src={svgLinks[sport.id]} alt="Representação gráfica do esporte" />
                            {sport.name}
                        </button>
                    )
                })}
            </div>
            <div className={`flex items-center`}>
                <h1 className={`flex-1 text-4xl`}>Jogos</h1>
                {topEvents[topEvents.map(e => e.id).indexOf(selectedSport)]?.events[0].markets.map(market => {
                    return (
                        <div key={market.id} className={`flex flex-col`}>
                            <span style={{ width: `${market.selections.length * 6.5}rem` }}
                                className={`flex justify-center text-sm`}>
                                {market.name}
                            </span>
                            {/* {showLabelAbove.includes(market.type) && <div className={`flex mt-3`}>
                                {market.selections.map(selections => {
                                    return <h6 className={`flex flex-1 text-sm justify-center`}>{selections.name}</h6>
                                })}
                            </div>} */}
                        </div>
                    )
                })}
            </div>
            <div>
                {topEvents.map(sport => {
                    return sport.id === selectedSport ?
                        sport.events.map(event => {
                            return <div key={event.id + "card"}>
                                <EventCard event={event} />
                                <hr className={`dark:border-gray-600 mt-2`} />
                            </div>
                        }) : null
                })}
            </div>
        </div>
    )
}