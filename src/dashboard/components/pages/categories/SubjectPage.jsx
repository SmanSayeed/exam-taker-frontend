import Loading from "@/dashboard/components/atoms/Loading";
import useDataTableColumns from "@/dashboard/components/molecules/categories/useDataTableColumns";
import QuestionCategoryFormWithSelect from "@/dashboard/components/organism/QuestionCategoryFormWithSelect";
import { DataTable } from "@/dashboard/components/templates/DataTable";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

export default function SubjectPage() {
    const { data: subjectData, isLoading, isSuccess, refetch } = useGetQuestionsCategoryQuery("subjects");
    const columns = useDataTableColumns("subjects");

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Subject"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <QuestionCategoryFormWithSelect
                    type={"subjects"}
                    refetchOnQuestionsCategoryQuery={refetch}
                    fromSubjects={true}
                />

                <div className='mt-8 mb-2 flex items-center justify-between space-y-2 '>
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
                            isSuccess && subjectData?.data?.data && <DataTable data={subjectData?.data?.data} columns={columns} />
                        )
                    }
                </div>
            </Layout.Body>
        </Layout>
    )
}