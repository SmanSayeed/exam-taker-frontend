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
import { Textarea } from "@/components/ui/textarea"

import { useUserRegisterMutation } from "@/features/auth/authApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const QuestionCreateForm = () => {
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
            toast.success("Question created successfully");
        }
    }, [error, setError, isSuccess]);

    return (
        <form onSubmit={handleSubmit(handleRegister)} >
            <div className="grid gap-4 space-y-2">
                
                {/* question type and marks */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Question Type */}
                    <div className="grid gap-2">
                        <Label>Question Type</Label>
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: "Type is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="creative">Creative</SelectItem>
                                        <SelectItem value="mcq">MCQ</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.type && <span className="text-red-600">{errors.type.message}</span>}
                    </div>
                    
                    {/* marks */}
                    <div className="grid gap-2">
                        <Label htmlFor="mark">Marks</Label>
                        <Input
                            {...register("mark", { required: "Marks is Required" })}
                            id="mark"
                            name="mark"
                            placeholder="2"
                        />
                        {errors.mark && <span className="text-red-600">{errors.mark.message}</span>}
                    </div>
                </div>

                {/* paid and featured */}
                <div className="grid grid-cols-2 gap-8">
                    {/* paid */}
                    <div className="grid gap-2">
                        <Label>Is Paid?</Label>
                        <Controller
                            name="paid"
                            control={control}
                            rules={{ required: "Is Paid is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Is Paid" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.paid && <span className="text-red-600">{errors.paid.message}</span>}
                    </div>
                    
                    {/* featured */}
                    <div className="grid gap-2">
                        <Label>Is Featured?</Label>
                        <Controller
                            name="featured"
                            control={control}
                            rules={{ required: "Is Featured is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Is Featured" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.featured && <span className="text-red-600">{errors.featured.message}</span>}
                    </div>
                </div>
                

                {/* title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        {...register("title", { required: "Title is Required" })}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="What is an algorithm?"
                    />
                    {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                </div>

                {/* text area for answer*/}
                <div className="grid gap-2">
                    <Label>Answer</Label>
                    <Controller
                            name="answer"
                            control={control}
                            rules={{ required: "Answer is required" }}
                            render={({ field }) => (
                                <Textarea
                  placeholder="Write the answer"
                  className="resize-none"
                  {...field}
                />
                            )}
                    />
                    {errors.answer && <span className="text-red-600">{errors.answer.message}</span>}
                </div>


                {/* text are for description */}
                <div className="grid gap-2">
                    <Label>Description</Label>
                    <Controller
                            name="description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <Textarea
                  placeholder="Write the description"
                  className="resize-none"
                  {...field}
                />
                            )}
                    />
                    {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                </div>

                <Button disabled={isLoading}>
                    Create a Question
                </Button>
            </div>
        </form>
    )
}
export default QuestionCreateForm;