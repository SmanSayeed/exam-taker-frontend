import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSinglePackageQuery } from "@/features/packages/packageApi";
import { useParams } from "react-router-dom";
import Loading from "../../atoms/Loading";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { PackageEditForm } from "../../molecules/package/PackageEditForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const PackageEditPage = () => {
    const { packageId } = useParams();
    const { data: singlePackage, isLoading } = useGetSinglePackageQuery(packageId);

    if (isLoading) return <Loading />;

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

                        <PackageEditForm singlePackage={singlePackage?.data} />
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default PackageEditPage;