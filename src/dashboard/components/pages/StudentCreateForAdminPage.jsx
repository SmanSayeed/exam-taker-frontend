import ThemeSwitch from "../atoms/ThemeSwitch";
import UserNav from "../molecules/UserNav";
import { Layout } from "../templates/Layout";

const StudentCreateForAdminPage = () => {
    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div>StudentCreateForAdminPage</div>
            </Layout.Body>
        </Layout>
    )
}

export default StudentCreateForAdminPage;