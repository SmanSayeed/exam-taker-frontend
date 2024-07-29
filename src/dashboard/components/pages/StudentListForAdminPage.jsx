import { columns } from "@/dashboard/data/columns";
import { students } from "@/dashboard/data/students";
import Search from "../atoms/Search";
import ThemeSwitch from "../atoms/ThemeSwitch";
import UserNav from "../molecules/UserNav";
import { DataTable } from "../templates/DataTable";
import { Layout } from "../templates/Layout";

const StudentListForAdminPage = () => {
    return (
        <Layout>
            <Layout.Header sticky>
                <Search />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className='mb-2 flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of students!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <DataTable data={students} columns={columns} />
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default StudentListForAdminPage;