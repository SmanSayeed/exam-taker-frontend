import { questionsColumns } from "@/dashboard/data/columns/questionsColumns";
import { ictQuestions } from "@/dashboard/data/questions";
import Search from "../../atoms/Search";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { DataTable } from "../../templates/DataTable";
import { Layout } from "../../templates/Layout";
import PageTitle from "../../atoms/PageTitle";
import FilteringQuestions from "../../organism/FilteringQuestions";
import { Card } from "@/components/ui/card";
import QuestionsList from "../../organism/QuestionsList";
import PaginationSCN from "../../molecules/PaginationSCN";
import { useGetQuestionsQuery } from "@/features/questions/questionApi";
import { useState } from "react";
import Loading from "../../atoms/Loading";

const QuestionListForAdminPage = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data: paginationData, isError, isLoading, isSuccess } = useGetQuestionsQuery(currentPage)
    
    

    return (
        <Layout>
            <Layout.Header sticky>
                {/* <Search /> */}
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
                    {isLoading ? <Loading /> : isSuccess && paginationData && 
                        <div>
                            <QuestionsList paginationData={paginationData} />
                            <PaginationSCN  />
                        </div> }
                </div>
                

                {/* <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <DataTable data={ictQuestions} columns={questionsColumns} />
                </div> */}
            </Layout.Body>
        </Layout>
    )
}
export default QuestionListForAdminPage;