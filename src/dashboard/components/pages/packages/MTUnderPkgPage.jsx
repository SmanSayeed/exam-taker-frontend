import { Button } from "@/components/ui/button";
import { useGetAllModelTestsQuery } from "@/features/modelTests/modelTestApi";
import { Link, useParams } from "react-router-dom";
import Loading from "../../atoms/Loading";
import ThemeSwitch from "../../atoms/ThemeSwitch";
import ModelTestCard from "../../molecules/modelTests/ModelTestCard";
import UserNav from "../../organism/UserNav";
import { Layout } from "../../templates/Layout";

const MTUnderPkgPage = () => {
    const { packageId } = useParams();

    const {
        data: allModelTests,
        isLoading,
        refetch,
    } = useGetAllModelTestsQuery();
    console.log("allModelTests", allModelTests)

    const allMTUnderPkg = allModelTests?.data.filter((item) => item?.package?.id === packageId);
    console.log("allmtunderpkg", allMTUnderPkg)

    if (isLoading) return <Loading />;

    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-semibold">Model Test</h1>
                    <Link to="/admin/model-tests/create">
                        <Button>Create New</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {
                        allMTUnderPkg.length > 0 ? (
                            allMTUnderPkg.map((item) => (
                                <ModelTestCard
                                    key={item?.id}
                                    modelTest={item}
                                    refetch={refetch}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No Model Test found under this package</div>
                        )
                    }
                </div>
            </Layout.Body>
        </Layout>
    );
};

export default MTUnderPkgPage;
