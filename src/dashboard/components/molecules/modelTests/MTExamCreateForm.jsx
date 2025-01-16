import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateMTExamMutation } from "@/features/modelTests/modelTestApi";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import { TableSkeleton } from "../../atoms/TableSkeleton";
import FilterQuesForMTExam from "./FilterQuesForMTExam";
import MTExamDetailsForm from "./MTExamDetailsForm";
import { questionsColumns } from "./questionsColumns";
import { QuestionsDataTable } from "./QuestionsDataTable";

const formSchema = z.object({
    exam_title: z.string().min(1, {
        message: "Exam title is required",
    }),
    description: z.string().optional(),
    exam_type: z.string().min(1, {
        message: "Exam type is required",
    }),
    time_limit: z.string().min(1, {
        message: "Time limit is required",
    }),
});

export default function MTExamCreateForm({ modelTestId }) {
    const auth = useSelector(state => state.auth);

    const [isActive, setIsActive] = useState(true);
    const [isPaid, setIsPaid] = useState(true);
    const [isOptional, setIsOptional] = useState(true);
    const [isNegativeMarking, setIsNegativeMarking] = useState(true);
    const [examType, setExamType] = useState("mcq");

    const [filters, setFilters] = useState({});
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
    const [rowSelection, setRowSelection] = useState({});

    const selectedRowIds = Object.keys(rowSelection);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            exam_title: "",
            description: "",
            exam_type: examType,
            // exam_type: "mcq",
            time_limit: "60"  // Default time limit of 60 minutes
        },
        mode: "onChange",
    });
    const { isValid, isSubmitting } = form.formState;

    const {
        refetch,
        isLoading: isLoadingQuestions
    } = useGetQuestionsQuery({
        page: pagination.pageIndex,
        perPage: pagination.pageSize,
        ...filters
    });

    const handleFilterQuestions = (payload) => {
        setFilters(payload);

        try {
            refetch({
                page: pagination.pageIndex + 1,
                perPage: pagination.pageSize,
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

    const [createMTExam, { isLoading: isMTExamCreating }] = useCreateMTExamMutation();

    const onSubmit = async (data) => {
        const payload = {
            title: data.exam_title,
            description: data.description,
            created_by: auth.admin_user.id,
            created_by_role: "admin",
            type: examType,
            // type: data.exam_type,
            time_limit: parseInt(data.time_limit),
            is_optional: isOptional,
            is_active: isActive,
            is_paid: isPaid,
            is_negative_mark_applicable: isNegativeMarking,
            model_test_id: modelTestId,
            questions_limit: selectedRowIds.length,
            question_ids: [...selectedRowIds],
            section_categories: filters.section_id || [],
            exam_type_categories: filters.exam_type_id || [],
            exam_sub_type_categories: filters.exam_sub_type_id || [],
            group_categories: filters.group_id || [],
            level_categories: filters.level_id || [],
            lesson_categories: filters.lesson_id || [],
            topic_categories: filters.topic_id || [],
            sub_topic_categories: filters.sub_topic_id || []
        };

        try {
            const response = await createMTExam({ id: modelTestId, data: payload }).unwrap();
            console.log("response", response)
            toast.success(response?.message || "Exam created successfully!");
        } catch (error) {
            toast.error(
                error?.data?.message || "An error occurred while creating the exam"
            );
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Exam Details */}
                <MTExamDetailsForm
                    form={form}
                    isActive={isActive} setIsActive={setIsActive}
                    isPaid={isPaid} setIsPaid={setIsPaid}
                    isOptional={isOptional} setIsOptional={setIsOptional}
                    isNegativeMarking={isNegativeMarking} setIsNegativeMarking={setIsNegativeMarking}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Exam Type Select */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Exam Type</label>
                        <Select
                            onValueChange={(value) => {
                                form.setValue("exam_type", value);
                                setExamType(value);
                            }}
                            defaultValue="mcq"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mcq">MCQ</SelectItem>
                                <SelectItem value="creative">Creative</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Time Limit Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Time Limit (minutes)</label>
                        <Input
                            type="number"
                            {...form.register("time_limit")}
                            placeholder="Enter time limit in minutes"
                        />
                    </div>
                </div>

                {/* filtering catgeory */}
                <FilterQuesForMTExam
                    form={form}
                    onFilter={handleFilterQuestions}
                />

                {/* question list table */}
                {
                    isLoadingQuestions ? (
                        <div className="mt-6">
                            <TableSkeleton />
                        </div>
                    ) : (
                        <QuestionsDataTable
                            columns={questionsColumns}
                            filters={filters}
                            pagination={pagination}
                            setPagination={setPagination}
                            rowSelection={rowSelection}
                            setRowSelection={setRowSelection}
                        />
                    )
                }

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={!isValid || isMTExamCreating}
                    >
                        {
                            isSubmitting || isMTExamCreating ? (
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