import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAdminAuth from "@/dashboard/hooks/useAdminAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeSwitch from "../atoms/ThemeSwitch";
import RegisterForm from "../molecules/auth/RegisterForm";
import UserNav from "../organism/UserNav";
import { Layout } from "../templates/Layout";

const UserCreateForAdminPage = () => {
    const navigate = useNavigate();
    const isAdmin = useAdminAuth();

    useEffect(() => {
        if (!isAdmin) {
            toast.warning("Login as a Admin");
            navigate("/login/admin");
        }
    }, [isAdmin, navigate]);

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <Card className="container mt-14">
                    <CardHeader>
                        <CardTitle className="text-xl">Admin User Creation</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <RegisterForm />
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}

export default UserCreateForAdminPage;