import { liveIcon } from "../icons";
import styles from "../../styles/LiveIndicator.module.css"

export default function LiveIndicator() {
    return (
        <div className={`flex justify-center mb-4`}>
            <div className={`flex justify-center items-center border-2 border-red-500 p-2 rounded-full
            ${styles.liveIndicator}`}>
                {liveIcon}
                <span className={`ml-2`}>AO VIVO</span>
            </div>
        </div>
    )
}