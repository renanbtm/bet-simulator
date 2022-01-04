interface TituloProps {
    titulo: string,
    subtitulo: string,
    icon?: any,
    buttons?: { icon: any, url: string }
}

export default function Titulo(props: TituloProps) {
    return (
        <div>
            <div className={`flex items-center`}>
                {props.icon && <img src={props.icon} alt="Ícone" width="50px" className={`mr-4`} />}
                <h1 className={`font-black text-3xl text-gray-900 dark:text-white`}>{props.titulo}</h1>
                {props.buttons && <a target="_blank" href={props.buttons.url}><div className={`ml-2`}>{props.buttons.icon}</div></a>}
            </div>
            <h2 className={`font-light text-sm text-gray-600 dark:text-gray-400`}>{props.subtitulo}</h2>
        </div>
    )

}