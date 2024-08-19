import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestionsCategoryMutation, useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomSelect from "../atoms/CustomSelect";


const QuestionCategoryFormWithSelect = ({
    type,
    refetchOnQuestionsCategoryQuery,
    fromExamTypes = false,
    fromExamSubTypes = false,
    fromSubjects = false,
    fromLessons = false,
    fromTopics = false,
    fromSubtopics = false,
}) => {
    const [statusCheck, setStatusCheck] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        control
    } = useForm();

    const [createQuestionsCategory, { data, isSuccess, isLoading, error }] = useCreateQuestionsCategoryMutation();
    const { data: sectionsData } = useGetQuestionsCategoryQuery("sections");
    const { data: yearsData } = useGetQuestionsCategoryQuery("years");
    const { data: examtypesData } = useGetQuestionsCategoryQuery("exam-types");
    const { data: levelsData } = useGetQuestionsCategoryQuery("levels");
    const { data: groupsData } = useGetQuestionsCategoryQuery("groups");
    const { data: subjectsData } = useGetQuestionsCategoryQuery("subjects");
    const { data: lessonsData } = useGetQuestionsCategoryQuery("lessons");
    const { data: topicsData } = useGetQuestionsCategoryQuery("topics");

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            const isValidType = validTypes.includes(file.type);
            const isValidSize = file.size <= 2 * 1024 * 1024; // 2 MB
            if (!isValidType) {
                setImageError("Only jpg, jpeg, and png formats are allowed.");
                setImage(null);
                return;
            }
            if (!isValidSize) {
                setImageError("File size should not exceed 2 MB.");
                setImage(null);
                return;
            }
            setImageError("");
            setImage(file);
        }
    };

    const handleCreate = (formData) => {
        const payload = {
            section_id: formData.sections,
            level_id: formData.level,
            group_id: formData.group,
            exam_type_id: formData.exam_types,
            subject_id: formData.subjects,
            lesson_id: formData.lessons,
            topic_id: formData.topics,
            part: formData.part,
            year: formData.years,
            title: formData.title,
            status: statusCheck,
            details: formData.details,
            picture: image
        }

        createQuestionsCategory({
            type,
            data: payload
        });
    }

    useEffect(() => {
        if (error?.data) {
            toast.error(error?.data?.message);
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${ error?.data?.message }`
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
        <form onSubmit={handleSubmit(handleCreate)} className="container gap-2 p-8 ">
            <div className="space-y-4 mt-4 ">

                {/* section and year select */}
                {
                    fromExamTypes && (
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* select section */}
                            <div>
                                <CustomSelect
                                    label={"sections"}
                                    categoryData={sectionsData?.data?.data}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.sections && <span className="text-red-600">{errors.sections.message}</span>}
                            </div>

                            {/* select year */}
                            <div>
                                <CustomSelect
                                    label={"years"}
                                    categoryData={yearsData?.data?.data}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.years && <span className="text-red-600">{errors.years.message}</span>}
                            </div>
                        </div>
                    )
                }

                {/* select exam-types */}
                {
                    fromExamSubTypes && (
                        <>
                            <CustomSelect
                                label={"exam_types"}
                                categoryData={examtypesData?.data?.data}
                                control={control}
                                errors={errors}
                            />
                            {errors.exam_types && <span className="text-red-600">{errors.exam_types.message}</span>}
                        </>
                    )
                }

                {/* select subject */}
                {
                    fromLessons && (
                        <>
                            <CustomSelect
                                label={"subjects"}
                                categoryData={subjectsData?.data?.data}
                                control={control}
                                errors={errors}
                            />
                            {errors.subjects && <span className="text-red-600">{errors.subjects.message}</span>}
                        </>
                    )
                }

                {/* select lesson */}
                {
                    fromTopics && (
                        <>
                            <CustomSelect
                                label={"lessons"}
                                categoryData={lessonsData?.data?.data}
                                control={control}
                                errors={errors}
                            />
                            {errors.lessons && <span className="text-red-600">{errors.lessons.message}</span>}
                        </>
                    )
                }

                {/* select topics */}
                {
                    fromSubtopics && (
                        <>
                            <CustomSelect
                                label={"topics"}
                                categoryData={topicsData?.data?.data}
                                control={control}
                                errors={errors}
                            />
                            {errors.topics && <span className="text-red-600">{errors.topics.message}</span>}
                        </>
                    )
                }

                {/* select level, group and and part */}
                {
                    fromSubjects && (
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* select level */}
                            <div>
                                <CustomSelect
                                    label={"level"}
                                    categoryData={levelsData?.data?.data}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.level && <span className="text-red-600">{errors.level.message}</span>}
                            </div>
                            {/* select group */}
                            <div>
                                <CustomSelect
                                    label={"group"}
                                    categoryData={groupsData?.data?.data}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.group && <span className="text-red-600">{errors.group.message}</span>}
                            </div>
                            {/* part select */}
                            <div>
                                <CustomSelect
                                    label={"part"}
                                    categoryData={[
                                        { id: 1, title: "1st part" },
                                        { id: 2, title: "2nd part" }
                                    ]}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.part && <span className="text-red-600">{errors.part.message}</span>}
                            </div>
                        </div>
                    )
                }

                {/* title and picture */}
                <div className="grid md:grid-cols-2 gap-4">
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
                    <div className="space-y-1">
                        <Label htmlFor="picture">Picture</Label>
                        <Input
                            {...register("picture")}
                            id="picture"
                            type="file"
                            name="picture"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={handleImageChange}
                            className="dark:bg-gray-600"
                        />
                        {errors.picture && <span className="text-red-600">{errors.picture.message}</span>}
                        {imageError && <span className="text-red-600">{imageError}</span>}
                    </div>
                </div>

                {/* details */}
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
    </Card >
)
}
export default QuestionCategoryFormWithSelect;