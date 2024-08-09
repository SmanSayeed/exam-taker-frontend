import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiStepContextProvider } from "@/providers/MultiStepContextProvider";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { McqTypeForm } from "../../molecules/createquestion/McqTypeForm";
import QuestionCreateForm from "../../molecules/createquestion/QuestionCreateForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const QuestionCreateForAdminPage = () => {
    return (
        <MultiStepContextProvider>
            <Layout>
                <Layout.Header>
                    <div className='ml-auto flex items-center space-x-4'>
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                </Layout.Header>

                <Layout.Body>
                    <div className="body w-full">
                        <div>
                            <Card className="container ">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Question Creation
                                    </CardTitle>
                                    <CardDescription>
                                        Enter proper information to create an question
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-6">
                                    <QuestionCreateForm />
                                    <McqTypeForm />
                                </CardContent>
                            </Card>
                        </div>

                        {/* <div className="aside w-full md:w-[35%]">
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
                        </div> */}
                    </div>
                </Layout.Body>
            </Layout>
        </MultiStepContextProvider>
    )
}
export default QuestionCreateForAdminPage;