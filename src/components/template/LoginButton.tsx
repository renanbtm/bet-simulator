import { useState } from "react"
import LoginModal from "./LoginModal"

export default function LoginButton() {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            <div className={`text-white`}>
                <button onClick={() => { setShowModal(true) }}
                    className={`bg-green-600 hover:bg-green-500 duration-200 pl-5 pr-5 pt-1 pb-1 rounded-sm`}>ENTRAR</button>
            </div>
            {showModal && <LoginModal toggleModal={setShowModal} />}
        </div>
    )
}