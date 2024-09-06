import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../dashboard/components/pages/DashboardLayout";


const PrivateRoutes = () => {
    const isLoggedIn = useAuth();

    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <DashboardLayout />
                    </>
                ) : (
                    <Navigate to="/" />
                )
            }
        </>
    );
};

export default PrivateRoutes;

