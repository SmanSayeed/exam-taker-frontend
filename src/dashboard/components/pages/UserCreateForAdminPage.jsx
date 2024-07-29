import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ThemeSwitch from "../atoms/ThemeSwitch";
import RegisterForm from "../molecules/auth/RegisterForm";
import UserNav from "../molecules/UserNav";
import { Layout } from "../templates/Layout";

const UserCreateForAdminPage = () => {
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