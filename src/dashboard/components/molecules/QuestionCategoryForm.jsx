import { Button } from "@/components/ui/button";
import { Card} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useCreateSectionMutation } from "@/features/questions/questionsCategory/section/sectionApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const QuestionCategoryForm = ({ inputTypeForTitle }) => {
    const [statusCheck, setStatusCheck] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
        control
    } = useForm();

    const [createSection, { data, isSuccess, isLoading, error }] = useCreateSectionMutation();

    const handleCreate = (formData) => {
        const payload = {
            title: formData.title,
            status: statusCheck
        }        
        createSection(payload)

    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            console.log("success")
        }
    },[data, isSuccess])

    return (
        <Card>
            <form onSubmit={handleSubmit(handleCreate)} className="container gap-2 p-8 ">
                <div className="space-y-4 mt-4 ">
                    <Input
                            {...register("title", { required: `title is Required` })}
                            id="title"
                            name="title"
                            placeholder="Enter title"
                    />
                    <Input type="file" name="picture" {...register("picture")}/>
                    
                    {/* <Textarea placeholder="Write your details here.." {...register("details")} /> */}
                    <Checkbox id="status" checked={statusCheck} onCheckedChange={(checked) => setStatusCheck(checked)} />
                    <label htmlFor="status" className="inline-block ml-2">Status</label>
                    <Button type="submit" className="block">Create</Button>
                </div>
            </form>
        </Card>
    )
}
export default QuestionCategoryForm