import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ThemeSwitch from "./../../atoms/ThemeSwitch";
import UserNav from "./../../molecules/UserNav";
import { Layout } from "./../../templates/Layout";
import Form from "../../molecules/Form";

const SectionForAdminPage = () => {
  return (
    <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <Form title={"Section"} type={"Section"} />
            </Layout.Body>
        </Layout>
  )
}

export default SectionForAdminPage
