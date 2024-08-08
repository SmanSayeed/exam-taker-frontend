import { Link } from "react-router-dom";
import LoginForm from "../../dashboard/components/molecules/auth/LoginForm";
import Header from "../organism/Header";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const StudentLoginPage = () => {

    return (
        <div>
            <Header />

            <Card className="mx-auto max-w-sm w-full mt-24">
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Student Login
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline">
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudentLoginPage;