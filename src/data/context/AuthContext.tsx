import { createContext, useEffect, useState } from "react"
import firebase from "../../firebase/config"
import User from "../../model/User"
import route from "next/router"
import Cookies from "js-cookie"

interface AuthContextProps {
    user?: User,
    loginGoogle?: () => Promise<void>,
    loading?: boolean,
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
    const token = await firebaseUser.getIdToken()
    var normalizedUser = new User(
        firebaseUser.uid,
        firebaseUser.email,
        firebaseUser.displayName,
        token,
        firebaseUser.providerData[0].providerId,
        firebaseUser.photoURL,
        0,
        [],
        []
    )

    const userData = await firebase.firestore().collection("users").doc(firebaseUser.uid).get()

    if (userData.exists) {
        normalizedUser.balance = userData.data().balance
        normalizedUser.bets = userData.data().bets
        normalizedUser.transfers = userData.data().transfers
    } else {
        await firebase.firestore().collection("users").doc(firebaseUser.uid).set({
            balance: 0,
            bets: [],
            transfers: []
        })
    }
    return normalizedUser
}

function manageCookie(logged: boolean) {
    if (logged) {
        Cookies.set("bet-simulator-auth", String(logged), {
            expires: 7
        })
    } else {
        Cookies.remove("bet-simulator-auth")
    }
}

export function AuthProvider(props) {

    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>(null)

    async function configureSession(firebaseUser) {
        if (firebaseUser?.email) {
            const user = await normalizedUser(firebaseUser)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            configureSession(resp.user)
            route.push("/")
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configureSession(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (Cookies.get("bet-simulator-auth")) {
            const cancel = firebase.auth().onIdTokenChanged(configureSession)
            return () => cancel()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user, loginGoogle, loading, logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext