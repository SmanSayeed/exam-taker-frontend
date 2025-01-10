import { Card } from "@/components/ui/card";
import { useGetSingleModelTestQuery } from "@/features/modelTests/modelTestApi";
import { useParams } from "react-router-dom";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { MTEditForm } from "../../organism/modelTests/MTEditForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const MTEditPage = () => {
    const { modelTestId } = useParams();
    const { data: modelTestData, isLoading: isFetching } = useGetSingleModelTestQuery(modelTestId);

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
                                <h1 className="text-xl font-semibold">ModelTest Modification</h1>
                                <p>Enter proper information to modify a Model Test</p>
                            </div>

                            <MTEditForm
                                modelTestData={modelTestData?.data}
                                isFetching={isFetching}
                                modelTestId={modelTestId}
                            />
                        </Card>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default MTEditPage;