import axios from "axios"
import { useEffect, useState } from "react"
import MenuItem from "./MenuItem"

// export async function getStaticProps() {
//     var response = await axios.get("https://br.betano.com/")
//     var data = String(response.data)
//     var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
//     data = data.slice(start)
//     var end = data.indexOf("</script>")
//     var jsonString = data.slice(0, end)
//     var jsonData = JSON.parse(jsonString)
//     var sports = []
//     jsonData.structureComponents.sports.data.forEach(sport => {
//         sports.push(sport)
//     })
//     return {
//         props: {
//             sports
//         }
//     }
// }

function MenuLateral(props) {

    const [sports, setSports] = useState([])

    useEffect(() => {
        async function loadAside() {
            var response = await axios.get("https://br.betano.com/")
            var data = String(response.data)
            var start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
            data = data.slice(start)
            var end = data.indexOf("</script>")
            var jsonString = data.slice(0, end)
            var jsonData = JSON.parse(jsonString)
            if (!jsonData.structureComponents.sports) {
                response = await axios.get("https://br.betano.com/sports")
                data = String(response.data)
                start = data.indexOf("window[\"initial_state\"]=") + "window[\"initial_state\"]=".length
                data = data.slice(start)
                end = data.indexOf("</script>")
                jsonString = data.slice(0, end)
                jsonData = JSON.parse(jsonString)
            }
            var asideSports = []
            jsonData.structureComponents.sports.data.forEach(sport => {
                asideSports.push(sport)
            })
            setSports(asideSports)
        }
        loadAside()
    }, [])

    return (
        <aside className={`flex flex-col bg-gray-200 dark:bg-gray-800 dark:text-white md:w-60`}>
            <div className={`w-10 lg:w-60`}>
                <ul className={`overflow-scroll`}>
                    {sports?.map(sport => {
                        return <MenuItem key={sport.id} sport={sport} />
                    })}
                </ul>
            </div>
        </aside>
    )
}

export default MenuLateral