import { useLocation } from "react-router-dom";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PackageCreateForm from "../../molecules/package/PackageCreateForm";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PackageEditForm from "../../molecules/package/PackageEditForm";

const PackageEditForAdminPage = ({ aPackage }) => {
    
    const location = useLocation();
    const pack = location.state?.aPackage;
    console.log("aPackage", pack)

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
                              Package Modification
                          </CardTitle>
                          <CardDescription>
                              Enter proper information to Modify the Package
                          </CardDescription>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-10">
                          <PackageEditForm />
                      </CardContent>
                  </Card>
              </div>
          </Layout.Body>
      </Layout>
  )
}

export default PackageEditForAdminPage