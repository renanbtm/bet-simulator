import Link from "next/link"
import Image from 'next/image'
import { svgLinks } from "../icons/svgLinksMap"

interface MenuItemProps {
    sport?: any,
    icon?: any,
    text?: string,
    onClick?: (event: any) => void,
    className?: string
}

export default function MenuItem(props: MenuItemProps) {
    return (
        <li onClick={props.onClick} className={`cursor-pointer hover:bg-gray-300 text-gray-900
            dark:hover:bg-gray-900 dark:text-white ${props.className} p-2`}>
            {
                props.sport ? <Link href={props.sport.url}>
                    <a className={`flex justify-center lg:justify-start items-center`}>
                        <Image src={svgLinks[props.sport.id]} width={32} height={32} className={`h-8 w-8 lg:h-10 lg:w-10`} alt="Ícone do esporte" />
                        <span className={`hidden lg:block text-s font-light text-center ml-3`}>
                            {props.sport.name}
                        </span>
                    </a>
                </Link> :
                    <a className={`flex flex-col justify-center items-center h-20`}>
                        {props.icon}
                        <span className={`text-xs font-light text-center`}>
                            {props.text}
                        </span>
                    </a>
            }
        </li>
    )
}