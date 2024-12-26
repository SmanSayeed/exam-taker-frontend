import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { additionalPkgCatsColumns } from "../../molecules/categories/additionalPkgCatsColumns";
import QuestionCategoryForm from "../../organism/QuestionCategoryForm";
import UserNav from "../../organism/UserNav";
import { DataTable } from "../../templates/DataTable";
import { Layout } from "../../templates/Layout";

export default function AdditionalPkgCatsPage() {
    const { data: additionalPkgCats, isLoading, isSuccess, refetch } = useGetQuestionsCategoryQuery("additional-package-categories");
    // const columns = useDataTableColumns("additional-package-categories");

    return (
        <Layout>
            <Layout.Header>
                <PageTitle title={"Tags"} />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <QuestionCategoryForm
                    type={"additional-package-categories"}
                    refetchOnQuestionsCategoryQuery={refetch}
                />

                <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam tags!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    {
                        isLoading ? (
                            <Loading />
                        ) : isSuccess && additionalPkgCats?.data && (
                            <DataTable
                                data={additionalPkgCats?.data}
                                columns={additionalPkgCatsColumns}
                            />
                        )
                    }
                </div>
            </Layout.Body>
        </Layout>
    )
}