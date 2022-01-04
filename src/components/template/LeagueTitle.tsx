import { doubleArrowIcon } from "../icons";

interface LeagueTitleProps {
    name: string
}

export default function LeagueTitle(props: LeagueTitleProps) {
    return (
        <div className={`flex items-center p-2`}
            style={{
                background: "linear-gradient(90deg, rgba(66,163,201,1) 0%, rgba(7,81,175,1) 100%)",
                borderTopRightRadius: "0.5rem",
                borderTopLeftRadius: "0.5rem"
            }}>
            {doubleArrowIcon}
            <h1 className={`ml-3`}>{props.name}</h1>
        </div>
    )
}