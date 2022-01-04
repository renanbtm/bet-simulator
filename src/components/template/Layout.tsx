import useAppData from "../../data/hooks/useAppData";
import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";
import MenuLateralDireito from "./MenuLateralDireito";
import TopBar from "./TopBar";

interface LayoutProps {
    titulo?: string,
    subtitulo?: string,
    children?: any,
    icon?: any,
    buttons?: { icon: any, url: string }
}

export default function Layout(props: LayoutProps) {

    const ctx = useAppData()

    return (
        <div className={`${ctx.theme} flex flex-col h-screen w-screen`}>
            <TopBar />
            <div className={`flex w-full bg-gray-100 dark:bg-gray-700`} style={{ marginTop: "60px" }}>
                <MenuLateral />
                <div className={`p-7 flex-1`}>
                    <Cabecalho buttons={props.buttons} icon={props.icon} titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        {props.children}
                    </Conteudo>
                </div>
                <MenuLateralDireito />
            </div>
        </div>
    )
}