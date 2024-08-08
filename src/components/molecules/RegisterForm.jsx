import { Link, useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch
    } = useForm();

    const watchPassword = watch("password");

    const handleRegister = async (formData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
                formData
            )
            console.log(response)

            if (response?.status === 201) {
                navigate("/login-student");
            }
        } catch (err) {
            console.error(err);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${err.message}`
            });
        }
    }

    return (
        <Card className="container mt-16">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(handleRegister)} >
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input
                                    {...register("firstName", {
                                        required: "First Name is Required",
                                    })}
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Max"
                                />
                                {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input
                                    {...register("lastName")}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Robinson"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register("email", { required: "Email is Required" })}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Your password must be at least 8 characters",
                                    },
                                })}
                                id="password"
                                name="password"
                                type="password"
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: value =>
                                        value === watchPassword || "Passwords do not match"
                                })}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                            />
                            {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-500 py-1 hover:bg-gray-400"
                        >
                            Create an account
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login-student" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default RegisterForm;