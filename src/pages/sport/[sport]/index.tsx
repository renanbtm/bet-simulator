import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { singleArrowIcon } from "../../../components/icons"
import Layout from "../../../components/template/Layout"
import LeagueLink from "../../../components/template/LeagueLink"
import LeagueTitle from "../../../components/template/LeagueTitle"

export default function Sport() {

    const router = useRouter()
    const [data, setData] = useState(undefined)

    useEffect(() => {
        async function loadSportBets() {
            try {
                var response = await axios.get("https://br.betano.com" + router.asPath)
                var data = String(response.data)
                var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
                data = data.slice(start)
                var end = data.indexOf("</script>")
                var jsonString = data.slice(0, end)
                var jsonData = JSON.parse(jsonString)
                setData(jsonData.data)
            } catch (e) {
                console.error(e)
            }
        }
        if (router.query.sport) loadSportBets()
    }, [router?.asPath, router?.query.sport])

    return (
        data ? <Layout titulo={String(data.name)} subtitulo="">
            {data.topLeagues.length > 0 && <div>
                <LeagueTitle name="POPULARES" />
                {data.topLeagues.map(league => {
                    return <div key={league.url + "populares"} className={`flex w-full`}>
                        <LeagueLink name={league.name} id={league.id} url={league.url}
                            style={{ flexGrow: 1 }} />
                    </div>
                })}
            </div>}
            {data.regionGroups.map(group => {
                return (
                    <div key={group.name}>
                        <LeagueTitle name={group.name} />
                        <div className={`flex flex-wrap`}>
                            {group.regions.map(region => {
                                return (
                                    <div key={region.id} className={`w-full`}>
                                        <div className={`flex mt-2 ml-2`}>
                                            {singleArrowIcon}
                                            <h1 className={`ml-3`}><u>{region.name}</u></h1>
                                        </div>
                                        <div className={`flex flex-wrap`}>
                                            {region.leagues.map(league => {
                                                return <LeagueLink key={league.url} name={league.name}
                                                    id={league.id} url={league.url}
                                                    style={{
                                                        margin: "1%", width: "18%", fontSize: "small", textAlign: "center",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                    }} />
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </Layout> :
            <Layout titulo="" subtitulo=""></Layout>
    )
}