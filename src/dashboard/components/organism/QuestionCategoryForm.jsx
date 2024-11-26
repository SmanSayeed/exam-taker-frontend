import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCreateQuestionsCategoryMutation } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const QuestionCategoryForm = ({ type, refetchOnQuestionsCategoryQuery }) => {
    const [statusCheck, setStatusCheck] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError
    } = useForm();

    const [createQuestionsCategory, { data, isSuccess, isLoading, error }] = useCreateQuestionsCategoryMutation();

    const handleCreate = (formData) => {
        const payload = {
            title: formData.title,
            status: statusCheck,
            details: formData.details,
            // picture: image
        }

        createQuestionsCategory({
            type,
            data: payload
        })
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
            toast.success(data?.message);
            reset();
            refetchOnQuestionsCategoryQuery();
        }
    }, [data, isSuccess, error, setError, reset, refetchOnQuestionsCategoryQuery]);

    return (
        <Card>
            <form onSubmit={handleSubmit(handleCreate)} className="p-4 md:p-8 ">
                <div className="space-y-4">
                    {/* category title */}
                    <div className="">
                        <div className="space-y-1">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                {...register("title", { required: "title is Required" })}
                                id="title"
                                name="title"
                                placeholder="Enter title"
                            />
                            {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                        </div>
                    </div>
                    {/* category details */}
                    <div className="space-y-1">
                        <Label htmlFor="details">Details</Label>
                        <Textarea
                            {...register("details")}
                            id="details"
                            name="details"
                            placeholder="Write your details here.."
                        />
                        {errors.details && <span className="text-red-600">{errors.details.message}</span>}
                    </div>
                    {/* status */}
                    <div>
                        <Checkbox
                            id="status"
                            checked={statusCheck}
                            onCheckedChange={(checked) => setStatusCheck(checked)}
                        />
                        <Label htmlFor="status" className="ml-2">Status</Label>
                    </div>

                    <Button disabled={isLoading}>
                        {isLoading ? "Loading" : "Create"}
                    </Button>
                </div>
            </form>
        </Card>
    )
}
export default QuestionCategoryForm;