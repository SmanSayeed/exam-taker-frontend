import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { TypeProvider } from "@/providers/TypeProvider";
import Loading from "../../../atoms/Loading";
import PageTitle from "../../../atoms/PageTitle";
import ThemeSwitch from "../../../atoms/ThemeSwitch";
import { columns } from "../../../molecules/datatable/Columns";
import QuestionCategoryFormWithSelect from "../../../molecules/QuestionCategoryFormWithSelect";
import UserNav from "../../../organism/UserNav";
import { DataTable } from "../../../templates/DataTable";
import { Layout } from "../../../templates/Layout";

const YearForQuestionPage = () => {
    const { data, isLoading, isSuccess, refetch } = useGetQuestionsCategoryQuery("years");

    return (
        <TypeProvider initialType="years">
            <Layout>
                <Layout.Header>
                    <PageTitle title={"Year"} />
                    <div className='ml-auto flex items-center space-x-4'>
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                </Layout.Header>

                <Layout.Body>
                    <QuestionCategoryFormWithSelect
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
                                isSuccess && data?.data && <DataTable data={data?.data} columns={columns} />
                            )
                        }
                    </div>
                </Layout.Body>
            </Layout>
        </TypeProvider>
    )
}
export default YearForQuestionPage