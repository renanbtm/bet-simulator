import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/">
            <a>
                <div className={`flex items-center p-4 cursor-pointer`}>
                    <img src="/logo.png" className={`w-10 h-10 lg:mr-3`} />
                    <div>
                        <span className={`hidden lg:block text-black`}>TheRBTM</span>
                        <span className={`hidden lg:block text-black text-xs`}>The Right Bet Training Method</span>
                    </div>
                </div>
            </a>
        </Link>
    )
}