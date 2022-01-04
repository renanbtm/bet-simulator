import { useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import AuthInput from "../auth/AuthInput"
import useAuth from "../../data/hooks/useAuth"
import { warningIcon } from "../icons"

interface LoginModalProps {
    toggleModal?: (boolean) => void
}

export default function LoginModal(props: LoginModalProps) {

    const ctx = useAuth()

    const [error, setError] = useState(null)
    const [mode, setMode] = useState<"login" | "register">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [open, setOpen] = useState(true)

    function showErrorMessage(message: string, time: number) {
        setError(message)
        setTimeout(() => setError(null), time)
    }

    function submit() {
        if (mode === "login") {
            showErrorMessage("Ocorreu um erro no login", 3000)
        } else {
            showErrorMessage("Ocorreu um erro no cadastro", 3000)
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {
                props.toggleModal(false)
                setOpen(false)
            }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                        leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:flex-1">
                                    <div className="mt-3 text-center sm:text-left flex-1">
                                        <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900 mb-2">
                                            {mode === "login" ? "Login" : "Sigup"}
                                        </Dialog.Title>
                                        {error ?
                                            <div className={`flex items-center bg-red-400 text-white p-3 rounded-md`}>
                                                {warningIcon}
                                                <span className={`ml-2`}>{error}</span>
                                            </div> :
                                            <div className={`h-12`}></div>
                                        }
                                        <div className="mt-2">
                                            <AuthInput label="Email" type="email" value={email} onChange={setEmail} required />
                                            <AuthInput label="Password" type="password" value={password} onChange={setPassword} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-col">
                                <button className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-3 mt-6`}
                                    onClick={submit}>{mode === "login" ? "Enter" : "Register"}</button>
                                <hr className={`my-6 border-gray-300 w-full`} />
                                <button className={`w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3`}
                                    onClick={() => {
                                        ctx.loginGoogle()
                                        props.toggleModal(false)
                                        setOpen(false)
                                    }}>Login with Google</button>
                                {mode === "login" ? (
                                    <p>
                                        Ainda não tem uma conta? <a className={`text-blue-600 hover:text-blue-700 cursor-pointer font-semibold`}
                                            onClick={() => setMode("register")}>Cadastre-se</a>
                                    </p>
                                ) : (
                                    <p>
                                        Já possui um cadastro? <a className={`text-blue-600 hover:text-blue-700 cursor-pointer font-semibold`}
                                            onClick={() => setMode("login")}>Entre aqui</a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}