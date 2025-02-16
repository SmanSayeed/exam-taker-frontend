import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEditQuestionsCategoryMutation, useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomSelect from "../../atoms/CustomSelect";

export function CategoryEditForm({ rowData, open, type, setOpen }) {
    const [statusCheck, setStatusCheck] = useState(false);

    const { data: sectionsData } = useGetQuestionsCategoryQuery("sections");
    const { data: yearsData } = useGetQuestionsCategoryQuery("years");
    const { data: examtypesData } = useGetQuestionsCategoryQuery("exam-types");
    const { data: levelsData } = useGetQuestionsCategoryQuery("levels");
    const { data: groupsData } = useGetQuestionsCategoryQuery("groups");
    const { data: subjectsData } = useGetQuestionsCategoryQuery("subjects");
    const { data: lessonsData } = useGetQuestionsCategoryQuery("lessons");
    const { data: topicsData } = useGetQuestionsCategoryQuery("topics");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control
    } = useForm();

    useEffect(() => {
        if (open && rowData) {
            if (type === "additional-package-categories") {
                setValue("title", rowData.name);
                setValue("details", rowData.description);
                setStatusCheck(rowData.is_active);
            } else {
                setValue("title", rowData.title);
                setValue("details", rowData.details);
                setStatusCheck(rowData.status);
            }

            setValue("sections", rowData.section_id);
            setValue("exam_types", rowData.exam_type_id);
            setValue("exam_types", rowData.exam_type_id);
            setValue("levels", rowData.level_id);
            setValue("groups", rowData.group_id);
            setValue("part", rowData.part);
            setValue("subjects", rowData.subject_id);
            setValue("lessons", rowData.lesson_id);
            setValue("topics", rowData.topic_id);
            setValue("years", rowData.year);
        }
    }, [open, rowData, setValue, type]);

    const [editQuestionsCategory, { isLoading }] = useEditQuestionsCategoryMutation();

    const handleCreate = async (formData) => {
        const payload = type === "additional-package-categories" ? {
            name: formData.title,
            description: formData.details,
            is_active: statusCheck ? 1 : 0,
        } : {
            title: formData.title,
            status: statusCheck ? 1 : 0,
            details: formData.details,
        };

        // Add optional fields to the payload dynamically
        if (formData.sections) {
            payload.section_id = formData.sections;
        }
        if (formData.exam_types) {
            payload.exam_type_id = formData.exam_types;
        }
        if (formData.groups) {
            payload.group_id = formData.groups;
        }
        if (formData.levels) {
            payload.level_id = formData.levels;
        }
        if (formData.subjects) {
            payload.subject_id = formData.subjects;
        }
        if (formData.lessons) {
            payload.lesson_id = formData.lessons;
        }
        if (formData.topics) {
            payload.topic_id = formData.topics;
        }
        if (formData.part) {
            payload.part = formData.part;
        }
        if (formData.year) {
            payload.year = formData.year;
        }

        try {
            const response = await editQuestionsCategory({
                type,
                data: payload,
                id: rowData.id,
            }).unwrap();

            toast.success(response?.message);
            setOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleCreate)} className="container gap-2 p-8 ">
            <div className="space-y-4 mt-4 ">

                {/* section and year select */}
                {
                    type === "exam-types" && (
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
                    type === "exam-sub-types" && (
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

                {/* select group */}
                {
                    type === "levels" && (
                        <>
                            <CustomSelect
                                label={"groups"}
                                categoryData={groupsData?.data?.data}
                                control={control}
                                errors={errors}
                            />
                            {errors.groups && <span className="text-red-600">{errors.groups.message}</span>}
                        </>
                    )
                }

                {/* select subject */}
                {
                    type === "lessons" && (
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
                    type === "topics" && (
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
                    type === "sub-topics" && (
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
                    type === "subjects" && (
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* select level */}
                            <div>
                                <CustomSelect
                                    label={"levels"}
                                    categoryData={levelsData?.data?.data}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.levels && <span className="text-red-600">{errors.levels.message}</span>}
                            </div>
                            {/* select group */}
                            <div>
                                <CustomSelect
                                    label={"groups"}
                                    categoryData={groupsData?.data?.data}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.groups && <span className="text-red-600">{errors.groups.message}</span>}
                            </div>
                            {/* part select */}
                            <div>
                                <CustomSelect
                                    label={"part"}
                                    categoryData={[
                                        { id: "1", title: "1st part" },
                                        { id: "2", title: "2nd part" }
                                    ]}
                                    control={control}
                                    errors={errors}
                                />
                                {errors.part && <span className="text-red-600">{errors.part.message}</span>}
                            </div>
                        </div>
                    )
                }

                {/* category title */}
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

                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Updating" : "Save changes"}
                </Button>
            </div>
        </form>
    )
}