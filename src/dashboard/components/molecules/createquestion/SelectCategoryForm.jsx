import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { Controller, useForm } from "react-hook-form";

const SelectCategoryForm = () => {
    const {
        register,
        formState: { errors },
        control,
        setError,
        handleSubmit
    } = useForm();

    const { data: sectionData } = useGetQuestionsCategoryQuery("sections");

    const handleSelect = (formData) => {
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit(handleSelect)} id="question-form">
            <div className="space-y-4 mt-4">

                {/* select section */}
                <div className="grid gap-2">
                    <Label>section</Label>
                    <Controller
                        name="section"
                        control={control}
                        rules={{ required: "Section is required" }}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Section" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        sectionData?.data?.data && sectionData?.data?.data.map(item => (
                                            <SelectItem key={item.id} value={item?.id}>
                                                {item?.title}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                >
                    Finish
                </Button>
            </div>
        </form>
    )
}

export default SelectCategoryForm