import { userColumns } from "@/dashboard/data/columns/userColumns";
import { users } from "@/dashboard/data/users";
import useAdminAuth from "@/dashboard/hooks/useAdminAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeSwitch from "../atoms/ThemeSwitch";
import UserNav from "../organism/UserNav";
import { DataTable } from "../templates/DataTable";
import { Layout } from "../templates/Layout";

const UserListForAdminPage = () => {
    const navigate = useNavigate();
    const isAdmin = useAdminAuth();

    useEffect(() => {
        if (!isAdmin) {
            toast.warning("Login as a Admin");
            navigate("/login/admin");
        }
    }, [isAdmin, navigate]);

    return (
        <Layout>
            <Layout.Header>
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
                            Here&apos;s a list of admin users!
                        </p>
                    </div>
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                    <DataTable data={users} columns={userColumns} />
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default UserListForAdminPage;