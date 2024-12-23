import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { PackageEditForm } from "../../molecules/package/PackageEditForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const PackageEditPage = () => {
    const location = useLocation();
    const singlePackage = location.state?.singlePackage;

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
                    <Card className="container ">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                Package Modification
                            </CardTitle>
                            <CardDescription>
                                Enter proper information to Modify the Package
                            </CardDescription>
                        </CardHeader>

                        <PackageEditForm singlePackage={singlePackage} />
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default PackageEditPage;