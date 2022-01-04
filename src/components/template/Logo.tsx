import Link from "next/link"
import Image from 'next/image'

export default function Logo() {
    return (
        <Link href="/">
            <a>
                <div className={`flex items-center p-4 cursor-pointer`}>
                    <Image src="/logo.png" width={40} height={40} alt="Website logo" className={`w-10 h-10 lg:mr-3`} />
                    <div>
                        <span className={`hidden lg:block text-black`}>TheRBTM</span>
                        <span className={`hidden lg:block text-black text-xs`}>The Right Bet Training Method</span>
                    </div>
                </div>
            </a>
        </Link>
    )
}