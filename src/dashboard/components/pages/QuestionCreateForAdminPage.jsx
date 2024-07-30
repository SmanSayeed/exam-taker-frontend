import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import ThemeSwitch from "../atoms/ThemeSwitch";
import UserNav from "../molecules/UserNav";
import { Layout } from "../templates/Layout";
import Search from "../atoms/Search";
import QuestionCreateForm from "../molecules/QuestionCreateForm";

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
                    <div className="body w-full md:w-[65%]  ">
                        <Card className="container ">
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
                    <div className="aside w-full md:w-[35%]  ">
                        <Card className="container " >
                            <CardHeader>
                                <CardTitle className="text-xl">Questions Category</CardTitle>
                                <CardDescription>
                                    Enter your questions information for go ahead 
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}
export default QuestionCreateForAdminPage;