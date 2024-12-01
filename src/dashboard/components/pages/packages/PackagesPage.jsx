import { useGetPackagesQuery } from "@/features/packages/packageApi";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PackageCard from "../../molecules/package/PackageCard";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const PackagesPage = () => {
  const { data: allPackages, isLoading, isSuccess, refetch } = useGetPackagesQuery();

  return (
    <Layout>
      <Layout.Header sticky>
        <PageTitle title={"Packages"} />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="">
          {
            isLoading ? (
              <Loading />
            ) : isSuccess && allPackages?.data ? (
              <div className="grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                {
                  allPackages?.data.map(singlePackage => (
                    <PackageCard
                      key={singlePackage?.id}
                      singlePackage={singlePackage}
                      refetch={refetch}
                    />
                  ))
                }
              </div>
            ) :
              <h1 className="text-5xl text-black">
                no package found
              </h1>
          }
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default PackagesPage;