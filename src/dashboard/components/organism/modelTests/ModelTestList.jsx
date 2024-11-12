import ModelTestCard from "../../molecules/modelTests/ModelTestCard";


const ModelTestList = ({ allModelTests }) => {

    return allModelTests?.data.map(item => <ModelTestCard key={item?.id} modelTest={item} />)
}

export default ModelTestList;