import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";

import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/features/auth/authApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const [login, { data, isLoading, error }] = useLoginMutation();

    const handleLogin = (formData) => {
        login(formData);
    }

    useEffect(() => {
        if (error?.data) {
            setError("root.random", {
                type: "random",
                message: error.data?.message,
            });

            toast.error(error.data?.message);
        }

        if (data && data?.data?.token) {
            toast.success(data?.message);
            navigate("/admin");
        }
    }, [data, error, navigate, setError]);

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="grid gap-4">
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
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
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

                <p className="text-red-600">{errors?.root?.random?.message}</p>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-slate-500 py-1 hover:bg-gray-400"
                >
                    Login
                </button>
            </div>
        </form>
    )
}

export default LoginForm;