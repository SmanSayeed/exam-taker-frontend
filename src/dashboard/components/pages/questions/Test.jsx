import { Card } from "@/components/ui/card";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PaginationSCN from "../../molecules/questionList/PaginationSCN";
import FilteringQuestions from "../../organism/FilteringQuestions";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionListForAdminPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const {
        control,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            keyword: "",
            section: [],
            exam_type: [],
            exam_sub_type: [],
            group: [],
            level: [],
            lesson: [],
            topic: [],
            sub_topic: [],
        },
    });

    // Watch for changes in form data
    const watchedFormData = watch();

    // Fetch data based on the current page and per-page value
    // const { data: paginationData, isLoading, isSuccess, refetch } = useGetQuestionsQuery({
    //     page: currentPage,
    //     per_page: perPage,
    // });

    // Trigger the query with dynamic parameters
    const { data: questions, refetch } = useGetQuestionsQuery({
        keyword: watchedFormData.keyword || "",
        type: watchedFormData.type || "mcq",
        section_id: watchedFormData.section,
        exam_type_id: watchedFormData.exam_type,
        exam_sub_type_id: watchedFormData.exam_sub_type,
        group_id: watchedFormData.group,
        level_id: watchedFormData.level,
        subject_id: watchedFormData.subject,
        lesson_id: watchedFormData.lesson,
        topic_id: watchedFormData.topic,
        sub_topic_id: watchedFormData.sub_topic,
        perPage: perPage,
    });

    return (
        <Layout>
            <Layout.Header sticky>
                <PageTitle title="Questions List" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <Card id="filtering-and-search-question" className="mb-5 h-full rounded-md p-3">
                    <FilteringQuestions
                        perPage={perPage}
                        currentPage={currentPage}
                        control={control}
                        setValue={setValue}
                    />
                </Card>

                <PaginationSCN
                    data={questions.data.data}
                    totalRecords={questions.data.total}
                    currentPage={currentPage}
                    perPage={perPage}
                    onPageChange={setCurrentPage}
                    onPerPageChange={setPerPage}
                    refetch={refetch}
                />
            </Layout.Body>
        </Layout>
    );
};

export default QuestionListForAdminPage;