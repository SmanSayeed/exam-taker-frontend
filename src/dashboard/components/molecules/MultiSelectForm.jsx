import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Simulated data fetching for exam types based on section
const useGetExamTypesQuery = (sectionIds) => {
    const mockExamTypes = {
        1: [{ id: 'exam1', title: 'Exam Type 1' }, { id: 'exam2', title: 'Exam Type 2' }],
        2: [{ id: 'exam3', title: 'Exam Type 3' }, { id: 'exam4', title: 'Exam Type 4' }],
    };

    const data = sectionIds.flatMap(sectionId => mockExamTypes[sectionId] || []);
    return { data };
}

const MultiSelectForm = () => {
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedExamTypes, setSelectedExamTypes] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false); // For section dropdown

    const {
        register,
        formState: { errors },
        control,
        setError,
        handleSubmit
    } = useForm();

    const { data: sectionData } = useGetQuestionsCategoryQuery("sections");
    const { data: examTypesData } = useGetExamTypesQuery(selectedSections);

    const handleSelect = (formData) => {
        console.log({
            ...formData,
            sections: selectedSections,
            examTypes: selectedExamTypes
        });
    }

    // Toggle selection of sections
    const toggleSection = (value) => {
        if (selectedSections.includes(value)) {
            setSelectedSections(selectedSections.filter(item => item !== value));
            console.log(selectedSections)
        } else {
            setSelectedSections([...selectedSections, value]);
        }
    }

    // Toggle selection of exam types
    const toggleExamType = (value) => {
        if (selectedExamTypes.includes(value)) {
            setSelectedExamTypes(selectedExamTypes.filter(item => item !== value));
            console.log(selectedExamTypes)
        } else {
            setSelectedExamTypes([...selectedExamTypes, value]);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSelect)} id="question-form">
            <div className="space-y-4 mt-4">

                <div className="flex gap-4">
                    {/* Custom section dropdown with checkboxes */}
                    <div className="grid gap-2">
                        <Label>Section</Label>
                        <div className="relative">
                            <div
                                className="w-[300px] border p-2 cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {selectedSections.length > 0 ? selectedSections.map(id => {
                                    const section = sectionData?.data?.data.find(sec => sec.id === id);
                                    return section?.title;
                                }).join(', ') : "Select Sections"}
                            </div>
                            {dropdownOpen && (
                                <div className="absolute bg-white border w-[300px] mt-1 z-10">
                                    {sectionData?.data?.data.map(item => (
                                        <div key={item.id} className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedSections.includes(item.id)}
                                                onChange={() => toggleSection(item.id)}
                                                className="mr-2"
                                            />
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.section && <span className="text-red-600">{errors.section.message}</span>}
                    </div>

                    {/* Conditionally render exam types multi-select if one or more sections are selected */}
                    {selectedSections.length > 0 && (
                        <div className="grid gap-2">
                            <Label>Exam Types</Label>
                            <div className="relative">
                                <div className="w-[300px] border p-2">
                                    {selectedExamTypes.length > 0 ? selectedExamTypes.map(id => {
                                        const examType = examTypesData.find(exam => exam.id === id);
                                        return examType?.title;
                                    }).join(', ') : "Select Exam Types"}
                                </div>
                                <div className="absolute bg-white border w-[300px] mt-1 z-10">
                                    {examTypesData.map(item => (
                                        <div key={item.id} className="p-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedExamTypes.includes(item.id)}
                                                onChange={() => toggleExamType(item.id)}
                                                className="mr-2"
                                            />
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {errors.examTypes && <span className="text-red-600">{errors.examTypes.message}</span>}
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                >
                    Finish
                </Button>
            </div>
        </form>
    )
}

export default MultiSelectForm;
