import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import ModelTestList from "../../organism/modelTests/ModelTestList";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const ModelTestsPage = () => {

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Model Test</h1>
                    <Link to="/admin/model-tests/create">
                        <Button>
                            Create New
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ModelTestList />
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default ModelTestsPage;