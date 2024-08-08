import ThemeSwitch from "@/dashboard/components/atoms/ThemeSwitch";
import Logo from "../atoms/Logo";
import MainNav from "../molecules/MainNav";

const Header = () => {

    return (
        <header className="border-b-[1px]">
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-8 py-6">
                    <Logo />
                    <MainNav />
                </div>
                <ThemeSwitch />
            </div>
        </header>
    )
}

export default Header;