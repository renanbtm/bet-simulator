import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { statisticsIcon } from "../../../components/icons";
import Layout from "../../../components/template/Layout";
import MatchBetCard from "../../../components/template/MatchBetCard";

export default function MatchPage() {

    const router = useRouter()
    const [event, setEvent] = useState(undefined)

    useEffect(() => {
        async function loadMatchData() {
            try {
                var response = await axios.get("https://br.betano.com" + router.asPath)
                var data = String(response.data)
                var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
                data = data.slice(start)
                var end = data.indexOf("</script>")
                var jsonString = data.slice(0, end)
                var jsonData = JSON.parse(jsonString)
                setEvent(jsonData.data.event)
            } catch (e) {
                console.error(e)
            }
        }
        loadMatchData()
    }, [router?.asPath])

    return (
        event ? (
            <Layout titulo={event.name} buttons={event.stats.length > 0 ?
                { icon: statisticsIcon, url: event.stats[0].url } : null}
                subtitulo={new Date(event.startTime).toLocaleDateString("pt-BR", {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}>
                {event.markets.map(market => {
                    return <MatchBetCard event={event} key={market.id} market={market} />
                })}
            </Layout>) :
            <Layout></Layout>
    )
}