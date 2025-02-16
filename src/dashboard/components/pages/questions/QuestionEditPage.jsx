import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import QuestionEditForm from "../../organism/QuestionEditForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionEditPage = () => {

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="w-full">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Question Edit
                                </CardTitle>
                                <CardDescription>
                                    Enter proper information to create a question
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-10">
                                <QuestionEditForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default QuestionEditPage;