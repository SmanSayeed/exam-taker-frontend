import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import ModelTestCreateForm from "../../organism/modelTests/ModelTestCreateForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const ModelTestCreatePage = () => {

    return (
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
                                <CardTitle className="text-xl font-semibold">
                                    Model Test Creation
                                </CardTitle>
                                <CardDescription>
                                    Enter proper information to create a Model Test
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-10">
                                <ModelTestCreateForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default ModelTestCreatePage;