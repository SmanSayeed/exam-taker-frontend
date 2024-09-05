import LoginForm from "@/dashboard/components/molecules/auth/LoginForm";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ThemeSwitch from "@/dashboard/components/atoms/ThemeSwitch";

const AdminLoginPage = () => {
    return (
        <div>
            <div className="mt-4 ml-4">
                <ThemeSwitch />
            </div>
            <Card className="mx-auto max-w-sm w-full mt-24">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Admin Login
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminLoginPage;