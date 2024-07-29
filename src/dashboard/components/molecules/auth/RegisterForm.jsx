import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { useUserRegisterMutation } from "@/features/auth/authApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
        control
    } = useForm();

    const watchPassword = watch("password");

    const [userRegister, { isSuccess, isLoading, error }] = useUserRegisterMutation();

    const handleRegister = (formData) => {
        const payload = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            role: formData.role,
            phone: formData.phone
        }

        userRegister(payload);
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message);

            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error?.data?.message}`
            });
        }

        if (isSuccess) {
            toast.success("User cretaed successfullt");
        }
    }, [error, setError, isSuccess]);

    return (
        <form onSubmit={handleSubmit(handleRegister)} >
            <div className="grid gap-4 space-y-2">
                {/* name */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            {...register("firstName", { required: "First Name is Required" })}
                            id="firstName"
                            name="firstName"
                            placeholder="Max"
                        />
                        {errors.firstName && <span className="text-red-600">{errors.firstName.message}</span>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                            {...register("lastName", { required: "Last Name is Required" })}
                            id="lastName"
                            name="lastName"
                            placeholder="Robinson"
                        />
                        {errors.lastName && <span className="text-red-600">{errors.lastName.message}</span>}
                    </div>
                </div>

                {/* email */}
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

                {/* phone number */}
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone(optional)</Label>
                    <Input
                        {...register("phone")}
                        id="phone"
                        name="phone"
                        type="tel"
                    />
                </div>

                {/* role */}
                <div className="grid gap-2">
                    <Label>Role</Label>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="sub_admin">Sub-admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                </div>

                {/* profile image */}
                <div className="grid gap-2">
                    <Label htmlFor="picture">Profile Imge</Label>
                    <Input
                        {...register("picture", {
                            minLength: {
                                value: 8,
                                message: "Your file size not more than 2mb",
                            },
                        })}
                        id="picture"
                        name="picture"
                        type="file"
                    />
                    {errors.img && <span className="text-red-600">{errors.img.message}</span>}
                </div>

                {/* password */}
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

                {/* confirm password */}
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: value => value === watchPassword || "Passwords do not match"
                        })}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                    />
                    {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                </div>

                <Button disabled={isLoading}>
                    Create an account
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm;