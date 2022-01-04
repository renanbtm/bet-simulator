import { createContext, useState } from "react"

interface AppContextProps {
    theme?: "" | "dark",
    toggleTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {

    const [theme, setTheme] = useState<"" | "dark">("")

    function toggleTheme() {
        setTheme(theme === "dark" ? "" : "dark")
    }
    return (
        <AppContext.Provider value={{
            theme: theme,
            toggleTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext