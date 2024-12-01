import { Card } from "@/components/ui/card";
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
                        <Card className="container">
                            <div className="my-4">
                                <h1 className="text-xl font-semibold">ModelTest Creation</h1>
                                <p>Enter proper information to create a Model Test</p>
                            </div>

                            {/* model test create form */}
                            <ModelTestCreateForm />
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default ModelTestCreatePage;