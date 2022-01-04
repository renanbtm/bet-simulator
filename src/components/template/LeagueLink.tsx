import Link from "next/link"

interface LeagueLinkProps {
    id: number,
    name: string,
    url: string,
    style?: object
}

export default function LeagueLink(props: LeagueLinkProps) {
    return (
        <Link href={props.url}>
            <a key={props.id} className={`p-2 m-2 bg-gray-200 dark:bg-gray-600 rounded-lg`} style={props.style}>
                <h2>{props.name}</h2>
            </a>
        </Link>
    )
}