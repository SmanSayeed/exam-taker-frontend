import ThemeSwitch from "./../../atoms/ThemeSwitch";
import UserNav from "./../../molecules/UserNav";
import { Layout } from "./../../templates/Layout";
import QuestionCategoryForm from "../../molecules/QuestionCategoryForm";
import PageTitle from "../../atoms/PageTitle";
import { DataTable } from "../../templates/DataTable";
import { sections } from "@/dashboard/data/sections";
import { sectionColumns } from "@/dashboard/data/columns/sectionColumns";

const SectionForAdminPage = () => {
  return (
    <Layout>
          <Layout.Header>
                  <PageTitle title={"Section"}/>
              <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
              <QuestionCategoryForm inputType={"text"} title={"Section"} placeholder={"Enter section"} />

              <div className='mt-8 mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of exam section!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                   <DataTable data={sections} columns={sectionColumns} />
                </div>
            </Layout.Body>
        </Layout>
  )
}
export default SectionForAdminPage