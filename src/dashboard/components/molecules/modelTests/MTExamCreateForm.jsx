import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateMTExamMutation } from "@/features/modelTests/modelTestApi";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import { DataTableForExamCreate } from "./DataTableForExamCreate";
import FilterQuesForMTExam from "./FilterQuesForMTExam";
import MTExamDetailsForm from "./MTExamDetailsForm";
import { questionsColumns } from "./questionsColumns";

const formSchema = z.object({
    exam_title: z.string().min(1, {
        message: "Exam title is required",
    }),
    description: z.string().optional(),
});

export default function MTExamCreateForm({ modelTestId }) {
    const [isActive, setIsActive] = useState(true);
    const [isPaid, setIsPaid] = useState(true);
    const [isOptional, setIsOptional] = useState(true);
    const [isNegativeMarking, setIsNegativeMarking] = useState(true);

    const [filters, setFilters] = useState({});
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handleSelectedRowIds = (ids) => {
        setSelectedRowIds(ids);
    };

    const auth = useSelector(state => state.auth);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            exam_title: "",
            description: ""
        },
        mode: "onChange",
    });
    const { isValid, isSubmitting } = form.formState;

    // Watch for changes in selectedRowIds
    useEffect(() => {
        console.log("Selected IDs in Form:", selectedRowIds);
    }, [selectedRowIds]);

    const {
        data: questionsData,
        refetch,
        isLoadingQuestions
    } = useGetQuestionsQuery({
        page: currentPage,
        perPage: perPage,
        ...filters
    });

    const handleFilterQuestions = (payload) => {
        setFilters(payload);

        try {
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

    const [createMTExam, { isLoading: isMTExamCreating }] = useCreateMTExamMutation();

    const onSubmit = async (data) => {
        const payload = {
            title: data.exam_title,
            description: data.description,
            created_by: auth.admin_user.id,
            created_by_role: "admin",
            type: "mcq",
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

        console.log("Submitting exam data:", payload);

        try {
            const response = await createMTExam({ id: modelTestId, data: payload }).unwrap();
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

                {/* filtering catgeory */}
                <FilterQuesForMTExam
                    form={form}
                    onFilter={handleFilterQuestions}
                    isLoading={isLoadingQuestions}
                />

                {/* question list table */}
                <DataTableForExamCreate
                    data={questionsData?.data?.data || []}
                    // onRowSelectionChange={handleSelectedRowIds}
                    columns={questionsColumns}
                    filters={filters}
                />

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






// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { useCreateMTExamMutation } from "@/features/modelTests/modelTestApi";
// import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import * as z from "zod";
// import { DataTableForExamCreate } from "./DataTableForExamCreate";
// import FilterQuesForMTExam from "./FilterQuesForMTExam";
// import MTExamDetailsForm from "./MTExamDetailsForm";
// import { questionsColumns } from "./questionsColumns";

// const formSchema = z.object({
//     exam_title: z.string().min(1, {
//         message: "Exam title is required",
//     }),
//     description: z.string().optional(),
// });

// export default function MTExamCreateForm({ modelTestId }) {
//     const [isActive, setIsActive] = useState(true);
//     const [isPaid, setIsPaid] = useState(true);
//     const [isOptional, setIsOptional] = useState(true);
//     const [isNegativeMarking, setIsNegativeMarking] = useState(true);

//     const [filters, setFilters] = useState({});
//     const [selectedRowIds, setSelectedRowIds] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [perPage, setPerPage] = useState(10);

//     const handleSelectedRowIds = (ids) => {
//         setSelectedRowIds(ids);
//     };

//     const auth = useSelector(state => state.auth);

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             exam_title: "",
//             description: ""
//         },
//         mode: "onChange",
//     });
//     const { isValid, isSubmitting } = form.formState;

//     // Watch for changes in selectedRowIds
//     useEffect(() => {
//         console.log("Selected IDs in Form:", selectedRowIds);
//     }, [selectedRowIds]);

//     const {
//         data: questionsData,
//         refetch,
//         isLoadingQuestions
//     } = useGetQuestionsQuery({
//         page: currentPage,
//         perPage: perPage,
//         ...filters
//     });

//     const handleFilterQuestions = (payload) => {
//         setFilters(payload);

//         try {
//             refetch({
//                 page: currentPage,
//                 perPage: perPage,
//                 ...payload,
//             });
//         } catch (err) {
//             toast.error(
//                 err?.data?.error ||
//                 err?.data?.message ||
//                 "An error occurred while filtering"
//             );
//         }
//     };

//     const [createMTExam, { isLoading: isMTExamCreating }] = useCreateMTExamMutation();

//     const onSubmit = async (data) => {
//         const payload = {
//             title: data.exam_title,
//             description: data.description,
//             created_by: auth.admin_user.id,
//             created_by_role: "admin",
//             type: "mcq",
//             is_optional: isOptional,
//             is_active: isActive,
//             is_paid: isPaid,
//             is_negative_mark_applicable: isNegativeMarking,
//             model_test_id: modelTestId,
//             questions_limit: selectedRowIds.length,
//             question_ids: [...selectedRowIds],
//             section_categories: filters.section_id || [],
//             exam_type_categories: filters.exam_type_id || [],
//             exam_sub_type_categories: filters.exam_sub_type_id || [],
//             group_categories: filters.group_id || [],
//             level_categories: filters.level_id || [],
//             lesson_categories: filters.lesson_id || [],
//             topic_categories: filters.topic_id || [],
//             sub_topic_categories: filters.sub_topic_id || []
//         };

//         console.log("Submitting exam data:", payload);

//         try {
//             const response = await createMTExam({ id: modelTestId, data: payload }).unwrap();
//             toast.success(response?.message || "Exam created successfully!");
//         } catch (error) {
//             toast.error(
//                 error?.data?.message || "An error occurred while creating the exam"
//             );
//         }
//     };

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Exam Details */}
//                 <MTExamDetailsForm
//                     form={form}
//                     isActive={isActive} setIsActive={setIsActive}
//                     isPaid={isPaid} setIsPaid={setIsPaid}
//                     isOptional={isOptional} setIsOptional={setIsOptional}
//                     isNegativeMarking={isNegativeMarking} setIsNegativeMarking={setIsNegativeMarking}
//                 />

//                 {/* filtering catgeory */}
//                 <FilterQuesForMTExam
//                     form={form}
//                     onFilter={handleFilterQuestions}
//                     isLoading={isLoadingQuestions}
//                 />

//                 {/* question list table */}
//                 <DataTableForExamCreate
//                     data={questionsData?.data?.data}
//                     currentPage={currentPage}
//                     perPage={perPage}
//                     setCurrentPage={setCurrentPage}
//                     setPerPage={setPerPage}
//                     columns={questionsColumns}
//                     onSelectRowIds={handleSelectedRowIds}
//                     refetch={refetch}
//                     totalRecords={questionsData?.data?.total}
//                 />

//                 {/* Action Buttons */}
//                 <div className="flex justify-center space-x-4">
//                     <Button
//                         className="w-full"
//                         type="submit"
//                         disabled={!isValid || isMTExamCreating}
//                     >
//                         {
//                             isSubmitting || isMTExamCreating ? (
//                                 <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Submitting...
//                                 </>
//                             ) : (
//                                 "Create Exam"
//                             )
//                         }
//                     </Button>
//                 </div>
//             </form>
//         </Form>
//     );
// }