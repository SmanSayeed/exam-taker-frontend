import { useState } from "react";
import Loading from "../../atoms/Loading";
import PageTitle from "../../atoms/PageTitle";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import PaginationSCN from "../../molecules/PaginationSCN";
import FilteringQuestions from "../../organism/FilteringQuestions";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";
import { useGetPackagesQuery } from "@/features/packages/packagesApi";
import PackageCardAndDetails from "../../molecules/package/PackageCardAndDetails";

const AllPackagesForAdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, isLoading, isSuccess } = useGetPackagesQuery()
  const packages = data?.data


  return (
    <Layout>
      <Layout.Header sticky>
        {/* <PageTitle title={"Packages"} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        {/* <Card id="filtering-and-search-question" className="mb-5 h-full rounded-md p-3">
                    <FilteringQuestions />
                </Card> */}

        <div className="">
          {isLoading ? <Loading /> : isSuccess && packages ?
            <div className="grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
              {
                packages.map(aPackage => <PackageCardAndDetails key={aPackage.id} aPackage={aPackage} />)
              }
            </div> :
            <h1 className="text-5xl text-black">
              no package found
            </h1>}
        </div>
      </Layout.Body>
    </Layout>
  )
}
export default AllPackagesForAdminPage;