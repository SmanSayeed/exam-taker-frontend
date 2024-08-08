import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const MainNav = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAuth();

    const handleClick = () => {
        if (isLoggedIn) {
            navigate("/admin");
        } else {
            navigate("/login/admin");
        }
    }

    return (
        <div>
            <nav className="flex gap-4">
                <Link to="/" className="text-lg">
                    Home
                </Link>
                <Link to="/login/student" className="text-lg">
                    Student
                </Link>
                <button onClick={handleClick} className="text-lg">
                    Admin
                </button>
            </nav>
        </div>
    )
}

export default MainNav;