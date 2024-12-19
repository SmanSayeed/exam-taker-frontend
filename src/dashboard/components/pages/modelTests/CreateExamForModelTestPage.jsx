import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import MTExamCreateForm from "../../molecules/modelTests/MTExamCreateForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

export default function CreateExamForModelTestPage() {
    const { modelTestId } = useParams();

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
                    <Card className="container py-4">
                        <MTExamCreateForm modelTestId={modelTestId} />
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}