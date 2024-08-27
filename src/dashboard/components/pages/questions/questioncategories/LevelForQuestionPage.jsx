import Loading from "@/dashboard/components/atoms/Loading";
import QuestionCategoryForm from "@/dashboard/components/molecules/QuestionCategoryForm";
import { DataTable } from "@/dashboard/components/templates/DataTable";
import useDataTableColumns from "@/dashboard/hooks/useDataTableColumns";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import PageTitle from "../../../atoms/PageTitle";
import ThemeSwitch from "../../../atoms/ThemeSwitch";
import UserNav from "../../../organism/UserNav";
import { Layout } from "../../../templates/Layout";

const LevelForQuestionPage = () => {
    const { data: levelData, isLoading, isSuccess, refetch } = useGetQuestionsCategoryQuery("levels");
    const columns = useDataTableColumns("levels");

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Level"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <QuestionCategoryForm
                    type={"levels"}
                    refetchOnQuestionsCategoryQuery={refetch}
                />

                <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam section group!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    {
                        isLoading ? <Loading /> : (
                            isSuccess && levelData?.data?.data && <DataTable data={levelData?.data?.data} columns={columns} />
                        )
                    }
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default LevelForQuestionPage