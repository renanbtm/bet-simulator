import Highlights from "../components/template/Highlights";
import Layout from "../components/template/Layout";
import TopEvents from "../components/template/TopEvents";

export default function Home() {
  return (
    <Layout titulo="Destaques" subtitulo="Próximos eventos principais">
      <Highlights />
      <TopEvents />
    </Layout>
  )
}
