import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetSingleModelTestQuery } from "@/features/modelTests/modelTestApi";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { convertToDateTimeLocal } from "@/utils/convertToDateTimeLocal";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import FilterQuestionsByCategory from "../questionList/FilterQuestionsByCategory";
import { DataTableForExamCreate } from "./DataTableForExamCreate";
import { questionsColumns } from "./questionsColumns";

export default function CreateExamFormForModelTest() {
    const [filters, setFilters] = useState({});

    const { modelTestId } = useParams();
    const { data: singleModelTest } = useGetSingleModelTestQuery(modelTestId);

    const [selectedRowIds, setSelectedRowIds] = useState([]);

    const form = useForm({
        defaultValues: {
            exam_title: "",
            is_optional: false,
            time_limit: "",
            start_time: "",
        },
        mode: "onChange",
    });

    // Update the form's values after the data is fetched
    useEffect(() => {
        if (singleModelTest?.data?.start_time) {
            const formattedStartTime = convertToDateTimeLocal(singleModelTest.data.start_time);
            const formattedEndTime = convertToDateTimeLocal(singleModelTest.data.end_time);

            form.reset({
                ...form.getValues(),
                start_time: formattedStartTime,
                end_time: formattedEndTime
            });
        }
    }, [singleModelTest, form]);

    // Watch for changes in selectedRowIds
    useEffect(() => {
        console.log("Selected IDs in Form:", selectedRowIds);
    }, [selectedRowIds]);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    console.log("perpage", perPage)

    const {
        data: questionsData,
        refetch,
        isLoadingQuestions
    } = useGetQuestionsQuery({
        page: currentPage,
        per_page: perPage,
        ...filters
    });

    console.log("question data", questionsData)

    const cleanPayload = (payload) =>
        Object.fromEntries(
            Object.entries(payload).filter(
                ([, value]) => value !== undefined && value.length > 0 // Remove empty fields
            )
        );

    const handleFilterQuestions = async (formData) => {
        const rawPayload = {
            section_id: formData.section || [],
            exam_type_id: formData.exam_type || [],
            exam_sub_type_id: formData.exam_sub_type || [],
            group_id: formData.group || [],
            level_id: formData.level || [],
            subject_id: formData.subject || [],
            lesson_id: formData.lesson || [],
            topic_id: formData.topic || [],
            sub_topic_id: formData.sub_topic || [],
        };
        const payload = cleanPayload(rawPayload); // Remove empty values

        try {
            setFilters(payload);
            refetch({
                page: currentPage,
                perPage: perPage,
                ...payload,
            });
        } catch (err) {
            toast.error(
                err?.data?.error ||
                err?.data?.message ||
                "An error occurred while filtering"
            );
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            question_ids: [...selectedRowIds],
        };
        console.log("Submitting exam data:", payload);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Exam Title Field */}
                <FormField
                    name="exam_title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exam Title</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter exam title"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Is Optional Field (Checkbox) */}
                <FormField
                    name="is_optional"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <input
                                    {...field}
                                    type="checkbox"
                                    className="mr-2"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                                Is Optional
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Time Limit Field */}
                <FormField
                    name="time_limit"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time Limit (minutes)</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Enter time limit"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Start Time Field */}
                <FormField
                    name="start_time"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="datetime-local"
                                    className="w-full px-4 py-2 border rounded-md"
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* End Time Field */}
                <FormField
                    name="end_time"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="datetime-local"
                                    className="w-full px-4 py-2 border rounded-md"
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* filtering catgeory */}
                <FilterQuestionsByCategory
                    control={form.control}
                    setValue={form.setValue}
                />
                <div className="text-end">
                    <Button
                        type="button"
                        onClick={form.handleSubmit(handleFilterQuestions)}
                        disabled={isLoadingQuestions}
                    >
                        Filtered
                    </Button>
                </div>

                {/* question list table */}
                <DataTableForExamCreate
                    data={questionsData?.data?.data}
                    currentPage={currentPage}
                    perPage={perPage}
                    setCurrentPage={setCurrentPage}
                    setPerPage={setPerPage}
                    columns={questionsColumns}
                    onRowSelectionChange={setSelectedRowIds}
                    refetch={refetch}
                    totalRecords={questionsData?.data?.total}
                />

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={!form.formState.isValid}
                    >
                        {
                            form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Create Exam"
                            )
                        }
                    </Button>
                </div>
            </form>
        </Form>
    );
}
