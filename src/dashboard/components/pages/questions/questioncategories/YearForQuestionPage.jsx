import Loading from "@/dashboard/components/atoms/Loading";
import QuestionCategoryForm from "@/dashboard/components/molecules/QuestionCategoryForm";
import { DataTable } from "@/dashboard/components/templates/DataTable";
import useDataTableColumns from "@/dashboard/hooks/useDataTableColumns";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import PageTitle from "../../../atoms/PageTitle";
import ThemeSwitch from "../../../atoms/ThemeSwitch";
import UserNav from "../../../organism/UserNav";
import { Layout } from "../../../templates/Layout";

const YearForQuestionPage = () => {
    const { data: yearData, isLoading, isSuccess, refetch } = useGetQuestionsCategoryQuery("years");
    const columns = useDataTableColumns("years");

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Year"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <QuestionCategoryForm
                    type={"years"}
                    refetchOnQuestionsCategoryQuery={refetch}
                />

                <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam section year!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    {
                        isLoading ? <Loading /> : (
                            isSuccess && yearData?.data?.data && <DataTable data={yearData?.data?.data} columns={columns} />
                        )
                    }
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default YearForQuestionPage