import { MultiStepContextProvider } from "@/providers/MultiStepContextProvider";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { DisplayTitle } from "../../molecules/multistepform/DisplayTitle";
import { Steps } from "../../molecules/multistepform/Steps";
import QuestionCreateForm from "../../organism/QuestionCreateForm";
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
                    <div className="flex flex-col-reverse md:flex-row items-start gap-5">
                        <div className="body w-full">
                            <Steps />
                            <div className="flex flex-col gap-2 rounded-md py-4 px-4 lg:px-16 lg:py-16 shadow-md lg:shadow-none">
                                <DisplayTitle />
                                <QuestionCreateForm />
                            </div>
                            {/* <Card className="container">
                            <CardHeader>
                                <CardTitle className="text-xl">Question Creation</CardTitle>
                                <CardDescription>
                                    Enter proper information to create an question
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <QuestionCreateForm />
                            </CardContent>
                        </Card> */}
                        </div>
                    </div>
                </Layout.Body>
            </Layout>
        </MultiStepContextProvider>
    )
}
export default QuestionCreateForAdminPage;