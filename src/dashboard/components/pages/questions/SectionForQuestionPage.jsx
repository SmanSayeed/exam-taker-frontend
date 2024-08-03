import ThemeSwitch from "./../../atoms/ThemeSwitch";
import UserNav from "./../../molecules/UserNav";
import { Layout } from "./../../templates/Layout";
import QuestionCategoryForm from "../../molecules/QuestionCategoryForm";
import PageTitle from "../../atoms/PageTitle";
import { DataTable } from "../../templates/DataTable";
import { sectionColumns } from "@/dashboard/data/columns/sectionColumns";
import { useGetSectionsQuery, useDeleteSectionMutation } from "@/features/questions/questionsCategory/section/sectionApi";
import Loading from "../../atoms/Loading";


const SectionForQuestionPage = () => {

    const { data, isLoading, isSuccess } = useGetSectionsQuery()

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Section"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <QuestionCategoryForm questionsCategoryEndPoint={"sections"} />

                <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam section!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    {isLoading ? <Loading /> : isSuccess && data?.data && <DataTable data={data?.data} columns={sectionColumns} />}
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default SectionForQuestionPage