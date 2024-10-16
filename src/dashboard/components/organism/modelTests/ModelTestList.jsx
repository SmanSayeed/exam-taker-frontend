import { useGetAllModelTestsQuery } from "@/features/modelTests/modelTestApi";
import Loading from "../../atoms/Loading";
import ModelTestCard from "../../molecules/modelTests/ModelTestCard";


const ModelTestList = () => {
    const { data: allModelTests, isLoading } = useGetAllModelTestsQuery();

    if (isLoading) return <Loading />

    return allModelTests?.data.map(item => <ModelTestCard key={item?.id} modelTest={item} />)
}

export default ModelTestList;