import { moonIcon, sunIcon } from "../icons";

interface SwitchThemeProps {
    theme: string,
    toggle: () => void
}

export default function ThemeSwitch(props: SwitchThemeProps) {
    return props.theme === "dark" ? (
        <div onClick={props.toggle} className={`
            bg-gradient-to-tr from-yellow-300 to-yellow-600
            w-14 lg:w-24 h-8 p-1 rounded-full
            hidden sm:flex items-center
            cursor-pointer`}>
            <div className={`flex items-center justify-center bg-white text-yellow-600 w-6 h-6 rounded-full`}>
                {sunIcon}
            </div>
            <div className={`text-white hidden lg:flex items-center ml-3`}>
                <span>Light</span>
            </div>
        </div>
    ) : (
        <div onClick={props.toggle} className={`
            bg-gradient-to-tr from-gray-800 to-gray-500
            w-14 lg:w-24 h-8 p-1 rounded-full
            hidden sm:flex items-center justify-end
            cursor-pointer`}>
            <div className={`text-white hidden lg:flex items-center mr-3`}>
                <span>Dark</span>
            </div>
            <div className={`flex items-center justify-center bg-white text-blue-900 w-6 h-6 rounded-full`}>
                {moonIcon}
            </div>
        </div>
    )
}