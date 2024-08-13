import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import PageTitle from "../../atoms/PageTitle";
import FilteringQuestions from "../../organism/FilteringQuestions";
import { Card } from "@/components/ui/card";
import PaginationSCN from "../../molecules/PaginationSCN";
import { useGetQuestionsQuery } from "@/features/questions/questionsApi";
import { useState } from "react";
import Loading from "../../atoms/Loading";

const QuestionListForAdminPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data: paginationData, isError, isLoading, isSuccess } = useGetQuestionsQuery(currentPage)
    

    return (
        <Layout>
            <Layout.Header sticky>
                <PageTitle title={"Questions List"}/>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                {/* filter starts */}
                <Card id="filtering-and-search-question" className="mb-5 h-80 sm:h-52 md:h-40 relative rounded-md p-2 ">
                    <FilteringQuestions />
                </Card>
                {/* filter ends */}

                <div>
                    {isLoading ? <Loading /> : isSuccess && paginationData?.data?.data ? <div>
                        {/* {paginationData?.data?.total > 10 && */}
                            <PaginationSCN />
                        {/* // } */}
                    </div> : <h1 className="text-5xl text-black"> 
                            no data found
                    </h1> }
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default QuestionListForAdminPage;