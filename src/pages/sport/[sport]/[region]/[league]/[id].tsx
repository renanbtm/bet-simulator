import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { svgLinks } from "../../../../../components/icons/svgLinksMap";
import EventCard from "../../../../../components/template/EventCard";
import Layout from "../../../../../components/template/Layout";

export default function League() {

    const router = useRouter()
    const [data, setData] = useState(undefined)
    const [markets, setMarkets] = useState([])
    const [selectionsSize, setSelectionsSize] = useState([])

    useEffect(() => {
        async function loadLeague() {
            try {
                var response = await axios.get("https://br.betano.com" + router.asPath)
                var data = String(response.data)
                var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
                data = data.slice(start)
                var end = data.indexOf("</script>")
                var jsonString = data.slice(0, end)
                var jsonData = JSON.parse(jsonString)
                setData(jsonData.data)
                var mkts = []
                var selSize = []
                // jsonData.data.blocks[0].headers.forEach(header => {
                //     header.marketTypes.forEach(market => {
                //         mkts.push(market)
                //     })
                // })
                // console.log(mkts)
                // setMarkets(mkts)

                jsonData.data.blocks[0].events.at(-1).markets.forEach(market => {
                    mkts.push(market.type)
                    selSize.push(market.selections.length)
                })
                setMarkets(mkts)
                setSelectionsSize(selSize)
            } catch (e) {
                console.error(e)
            }
        }
        if (router.query.sport) loadLeague()
    }, [router?.asPath])

    return (
        data && markets && selectionsSize ? (
            <Layout icon={svgLinks[data.sport.id]} titulo={data.blocks[0].shortName}>
                <div className={`flex items-center`}>
                    <h1 className={`flex-1 text-4xl`}>Eventos</h1>
                    {data.blocks[0].events.at(-1).markets.map(market => {
                        return market.selections.length < 4 && <div key={market.id} className={`flex flex-col`}>
                            <span style={{ width: `${market.selections.length * 6.5}rem` }}
                                className={`flex justify-center text-sm`}>
                                {market.name}
                            </span>
                        </div>
                    })}
                </div>
                {data.blocks[0].events.map(event => {
                    return <div key={event.id}>
                        <EventCard selectionsSizes={selectionsSize} marketTypes={markets} event={event} />
                        <hr className={`dark:border-gray-600 mt-2`} />
                    </div>
                })}
            </Layout>
        ) :
            <Layout></Layout>
    )
}