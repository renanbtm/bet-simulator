import { useState } from "react";
import Image from 'next/image'
import AuthInput from "../components/auth/AuthInput";
import { warningIcon } from "../components/icons";
import useAuth from "../data/hooks/useAuth";

export default function Autenticacao() {

    const ctx = useAuth()

    const [error, setError] = useState(null)
    const [mode, setMode] = useState<"login" | "register">("login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function showErrorMessage(message: string, time: number) {
        setError(message)
        setTimeout(() => setError(null), time)
    }

    function submit() {
        if (mode === "login") {
            console.info("Entrando")
            showErrorMessage("Ocorreu um erro no login", 3000)
        } else {
            console.info("Cadastrando")
            showErrorMessage("Ocorreu um erro no cadastro", 3000)
        }
    }

    return (
        <div className={`flex w-full h-screen justify-center items-center`}>
            <div className={`hidden h-screen md:block lg:w-2/3 w-1/2`}>
                <div className={`h-screen w-full relative`}>
                    <Image src="/homepage.jpg" layout='fill' objectFit='cover' alt="Imagem da tela de autenticação" />
                </div>
            </div>
            <div className={`w-full md:w-1/2 lg:w-1/3 m-10`}>
                <h1 className={`text-3xl font-bold mb-5 underline`}>
                    {mode === "login" ? "Login" : "Sigup"}
                </h1>

                {error ?
                    <div className={`flex items-center bg-red-400 text-white p-3 rounded-md`}>
                        {warningIcon}
                        <span className={`ml-2`}>{error}</span>
                    </div> :
                    <div className={`h-12`}></div>
                }
                <AuthInput label="Email" type="email" value={email} onChange={setEmail} required />
                <AuthInput label="Password" type="password" value={password} onChange={setPassword} required />
                <button className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-3 mt-6`}
                    onClick={submit}>{mode === "login" ? "Enter" : "Register"}</button>
                <hr className={`my-6 border-gray-300 w-full`} />
                <button className={`w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3`}
                    onClick={ctx.loginGoogle}>Login with Google</button>
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
    )
}