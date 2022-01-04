interface AuthInputProps {
    label: string,
    value: any,
    onChange: (newValue: any) => void,
    type?: "text" | "email" | "password",
    required?: boolean
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <div className={`flex flex-col mt-4`}>
            <label htmlFor="">{props.label}</label>
            <input type={props.type ?? "text"} value={props.value} onChange={e => props.onChange(e.target.value)}
                required={props.required ?? false} className={`px-4 py-3 rounded-lg bg-gray-200 mt-2
                    focus:bg-white`} />
        </div>
    )
}