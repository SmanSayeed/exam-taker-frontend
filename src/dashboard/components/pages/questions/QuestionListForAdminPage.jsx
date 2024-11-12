import { Card } from "@/components/ui/card";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PaginationSCN from "../../molecules/PaginationSCN";
import FilteringQuestions from "../../organism/FilteringQuestions";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionListForAdminPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: paginationData, isLoading, isSuccess, refetch } = useGetQuestionsQuery(currentPage);

    if (isLoading) {
        return <Loading />
    }

    return (
        <Layout>
            <Layout.Header sticky>
                <PageTitle title={"Questions List"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <Card id="filtering-and-search-question" className="mb-5 h-full rounded-md p-3">
                    <FilteringQuestions />
                </Card>

                <div>
                    {isLoading ? <Loading /> : isSuccess && paginationData?.data?.data ? <div>
                        {/* {paginationData?.data?.total > 10 && */}
                        <PaginationSCN refetch={refetch} />
                        {/* // } */}
                    </div> : <h1 className="text-5xl text-black">
                        no data found
                    </h1>}
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default QuestionListForAdminPage;