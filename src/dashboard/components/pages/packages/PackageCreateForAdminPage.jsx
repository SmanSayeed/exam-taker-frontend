import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import PackageCreateForm from "../../molecules/package/PackageCreateForm";


function PackageCreateForAdminPage() {
    return (
        <Layout>
            <Layout.Header>
                {/* <PageTitle title={"Package Create"} /> */}
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
                                Package Creation
                            </CardTitle>
                            <CardDescription>
                                Enter proper information to create a Package
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-10">
                            <PackageCreateForm />
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default PackageCreateForAdminPage