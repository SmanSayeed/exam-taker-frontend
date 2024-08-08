import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import QuestionCreateForm from "../../organism/QuestionCreateForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionCreateForAdminPage = () => {
    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="flex flex-col-reverse md:flex-row items-start gap-5">
                    <div className="body w-full">
                        <Card className="container">
                            <CardHeader>
                                <CardTitle className="text-xl">Question Creation</CardTitle>
                                <CardDescription>
                                    Enter proper information to create an question
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <QuestionCreateForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default QuestionCreateForAdminPage;