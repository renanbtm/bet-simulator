import useAppData from "../../data/hooks/useAppData";
import ThemeSwitch from "./ThemeSwitch";
import Titulo from "./Titulo";

interface CabecalhoProps {
    titulo: string,
    subtitulo: string,
    icon?: any,
    buttons?: { icon: any, url: string }
}

export default function Cabecalho(props: CabecalhoProps) {

    const ctx = useAppData()

    return (
        <div className={`flex`}>
            <Titulo buttons={props.buttons} icon={props.icon} titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className={`flex flex-1 justify-end`}>
                <ThemeSwitch theme={ctx.theme} toggle={ctx.toggleTheme} />
            </div>
        </div>
    )
}