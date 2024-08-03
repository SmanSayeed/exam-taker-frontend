import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../molecules/UserNav";
import { Layout } from "../../templates/Layout";
import PageTitle from "../../atoms/PageTitle";
import { DataTable } from "../../templates/DataTable";
import { examTypeColumns } from "@/dashboard/data/columns/examTypeColumns";
import { useGetExamTypesQuery } from "@/features/questions/questionsCategory/examTypes/examTypesApi";
import Loading from "../../atoms/Loading";
import QuestionCategoryTypeForm from "../../molecules/QuestionCategoryTypeForm";


const ExamTypeForQuestionPage = () => {

    const { data, isSuccess, isLoading } = useGetExamTypesQuery()
    console.log(data?.data)

  return (
    <Layout>
          <Layout.Header>
                  <PageTitle title={"Exam type"}/>
              <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
              <QuestionCategoryTypeForm  />
              <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam types!
                        </p>
                    </div>
                </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                  {isLoading ? <Loading /> : isSuccess && data?.data && <DataTable data={data?.data} columns={examTypeColumns} />}
                </div>
            </Layout.Body>
        </Layout>
  )
}
export default ExamTypeForQuestionPage