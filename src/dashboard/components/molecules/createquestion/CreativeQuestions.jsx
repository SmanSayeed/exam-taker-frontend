import { Button } from "@/components/ui/button";
import CreativeQuestion from "./CreativeQuestion";

export const CreativeQuestions = ({
    creativeQueTypes,
    setCreativeQueTypes,
    control
}) => {

    const addNew = () => {
        if (creativeQueTypes.length === 3) {
            setCreativeQueTypes(prevTypes => [...prevTypes, prevTypes.length]);
        }
    };

    const deleteQueType = (queTypeIndexToDelete) => {
        if (creativeQueTypes.length === 4) {
            setCreativeQueTypes(prevType =>
                prevType.filter(queTypeIndex => queTypeIndex !== queTypeIndexToDelete)
            );
        }
    };

    return (
        <div>
            {
                creativeQueTypes.map((queTypeIndex) => (
                    <div key={queTypeIndex} className="flex items-center justify-between mb-4">
                        <CreativeQuestion
                            control={control}
                            queTypeIndex={queTypeIndex}
                        />

                        {
                            creativeQueTypes.length === 4 && queTypeIndex === 3 && (
                                <Button
                                    type="button"
                                    onClick={() => deleteQueType(queTypeIndex)}
                                    className="ml-4"
                                >
                                    Delete
                                </Button>
                            )
                        }
                    </div>
                ))
            }

            <div className="flex justify-end mt-4">
                {creativeQueTypes.length === 3 && (
                    <Button type="button" onClick={addNew} className="ml-4">
                        Add new
                    </Button>
                )}
            </div>
        </div>
    );
};
