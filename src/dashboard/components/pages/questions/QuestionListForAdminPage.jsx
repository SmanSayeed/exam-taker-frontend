import { Card } from "@/components/ui/card";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PaginationSCN from "../../molecules/questionList/PaginationSCN";
import FilteringQuestions from "../../organism/FilteringQuestions";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionListForAdminPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    // Fetch data based on the current page and per-page value
    const { data: paginationData, isLoading, isSuccess, refetch } = useGetQuestionsQuery({
        page: currentPage,
        per_page: perPage,
    });

    // const { data: filteredQuestion } = useQuestionSearchQuery({
    //     keyword,
    //     type,
    //     section_id,
    //     exam_type_id,
    //     exam_sub_type_id,
    //     group_id,
    //     level_id,
    //     subject_id,
    //     lesson_id,
    //     topic_id,
    //     sub_topic_id,
    //     perPage: perPage
    // });

    // console.log("filteredQuestion", filteredQuestion)

    if (isLoading) return <Loading />;
    if (!isSuccess || !paginationData) return <h1 className="text-5xl text-black">No data found</h1>;

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
                    <FilteringQuestions />
                </Card>

                <div>
                    <PaginationSCN
                        data={paginationData.data.data}
                        totalRecords={paginationData.data.total}
                        currentPage={currentPage}
                        perPage={perPage}
                        onPageChange={setCurrentPage}
                        onPerPageChange={setPerPage}
                        refetch={refetch}
                    />
                </div>
            </Layout.Body>
        </Layout>
    );
};

export default QuestionListForAdminPage;
