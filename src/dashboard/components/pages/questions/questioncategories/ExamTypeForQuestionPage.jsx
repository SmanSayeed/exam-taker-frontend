import useDataTableColumns from "@/dashboard/components/molecules/datatable/useDataTableColumns";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import Loading from "../../../atoms/Loading";
import PageTitle from "../../../atoms/PageTitle";
import ThemeSwitch from "../../../atoms/ThemeSwitch";
import QuestionCategoryFormWithSelect from "../../../molecules/QuestionCategoryFormWithSelect";
import UserNav from "../../../organism/UserNav";
import { DataTable } from "../../../templates/DataTable";
import { Layout } from "../../../templates/Layout";

const ExamTypeForQuestionPage = () => {
    const { data: examtypeData, isLoading, isSuccess, refetch } = useGetQuestionsCategoryQuery("exam-types");
    const columns = useDataTableColumns("exam-types");

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Exam type"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <QuestionCategoryFormWithSelect
                    type={"exam-types"}
                    refetchOnQuestionsCategoryQuery={refetch}
                    fromExamTypes={true}
                />

                <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam types!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    {isLoading ? <Loading /> : isSuccess && examtypeData?.data?.data && <DataTable data={examtypeData?.data?.data} columns={columns} />}
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default ExamTypeForQuestionPage