import { Card } from "@/components/ui/card";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import { PackageCreateForm } from "../../molecules/package/PackageCreateForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

function PackageCreatePage() {

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
                        <div className="my-4">
                            <h1 className="text-xl font-semibold">Package Creation</h1>
                            <p>Enter proper information to create a Package</p>
                        </div>

                        <PackageCreateForm />
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default PackageCreatePage;