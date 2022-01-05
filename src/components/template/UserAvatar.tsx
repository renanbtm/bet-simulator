import { useEffect, useState } from "react";
import Link from "next/link"
import useAuth from "../../data/hooks/useAuth";
import User from "../../model/User";
import { chevronDownIcon, chevronUpIcon, LogoutIcon, userIcon } from "../icons";

interface userAvatarProps {
    user: User
}

export default function UserAvatar(props: userAvatarProps) {

    const [showDatails, setShowDetails] = useState<boolean>(false)
    const { logout, user } = useAuth()

    const [_, setTime] = useState(Date.now());

    // TODO Arrumar essa gambiarra
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 500);
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className={`flex flex-row-reverse text-white items-center`}>
            <div className={`cursor-pointer flex items-center`} onClick={() => setShowDetails(!showDatails)}>
                {userIcon}
                {showDatails ? chevronUpIcon : chevronDownIcon}
            </div>
            <span className={`mr-5 font-bold`}>SALDO: R$ {user.balance.toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
            {showDatails && <div className={`absolute top-12 border p-2 text-black dark:text-white
            bg-gray-200 border-gray-400 dark:bg-gray-600 dark:border-gray-800`}>
                <div className={`flex w-60 items-center justify-between`}>
                    <span className={`text-xs`}>{props.user.name}</span>
                    <span className={`text-xs`}>R$ {props.user.balance.toLocaleString("pt-br", { style: "decimal", maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                </div>
                <hr className={`border-black dark:border-white mt-2 mb-2`} />
                <div className={`flex w-52 items-center justify-between`}>
                    <Link href="/profile">
                        <a className={`border text-center border-black dark:border-white rounded-sm pl-2 pr-2 pt-1 pb-1 mr-3 flex-1`}>Minha conta</a>
                    </Link>
                    <button onClick={() => logout()}>
                        {LogoutIcon}
                    </button>
                </div>
            </div>}
        </div>
    )
}