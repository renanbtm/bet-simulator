import useAuth from "../../data/hooks/useAuth";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";

export default function TopBar() {

    const ctx = useAuth()

    return (
        <div className={`fixed w-full flex items-center justify-between p-4 z-40`}
            style={{
                background: "linear-gradient(90deg, rgba(66,163,201,1) 0%, rgba(7,81,175,1) 100%)",
                height: "60px",
            }}>
            <Logo />

            {ctx.loading ?
                null :
                !ctx.user ?
                    <LoginButton /> :
                    <UserAvatar user={ctx.user} />
            }

        </div>
    )
}