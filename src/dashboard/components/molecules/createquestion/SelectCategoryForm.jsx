import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MultiSelectCategory from "../MultiSelectCategory";

// Simulated data fetching for exam types based on section
const useGetExamTypesQuery = (sectionId) => {
    // Replace this with actual data fetching logic
    const mockExamTypes = {
        1: [{ id: 'exam1', title: 'Exam Type 1' }, { id: 'exam2', title: 'Exam Type 2' }],
        2: [{ id: 'exam3', title: 'Exam Type 3' }, { id: 'exam4', title: 'Exam Type 4' }],
        // Add more sections and their exam types as needed
    };
    return { data: mockExamTypes[sectionId] || [] };
}

const SelectCategoryForm = () => {
    const [selectedSection, setSelectedSection] = useState(null);

    const {
        register,
        formState: { errors },
        control,
        setError,
        handleSubmit
    } = useForm();

    const { data: sectionData } = useGetQuestionsCategoryQuery("sections");
    const sections = sectionData?.data?.data?.map(item => item?.title) || [];
    const { data: examTypesData } = useGetExamTypesQuery(selectedSection);

    const handleSelect = (formData) => {
        console.log(formData)
    }

    const handleCategoryChange = (selectedCategories) => {
        console.log("Selected categories:", selectedCategories);
    };

    return (
        <form onSubmit={handleSubmit(handleSelect)} id="question-form">
            <div className="space-y-4 mt-4">

                {/* select section */}
                <div className="grid gap-2">
                    <Label>Section</Label>
                    <Controller
                        name="section"
                        control={control}
                        rules={{ required: "Section is required" }}
                        render={({ field }) => (
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setSelectedSection(value);
                                }}
                                value={field.value}
                            >
                                <SelectTrigger className="w-[300px]">
                                    <SelectValue placeholder="Section" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        sectionData?.data?.data && sectionData?.data?.data.map(item => (
                                            <SelectItem key={item.id} value={item?.id}>
                                                {item?.title}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                </div>

                <MultiSelectCategory
                    options={sections}
                    label="Sections"
                    onChange={handleCategoryChange}
                />

                {/* Conditionally render exam types select if a section is selected */}
                {selectedSection && (
                    <div className="grid gap-2">
                        <Label>Exam Type</Label>
                        <Controller
                            name="examType"
                            control={control}
                            rules={{ required: "Exam Type is required" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-[300px]">
                                        <SelectValue placeholder="Exam Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {examTypesData && examTypesData.map(item => (
                                            <SelectItem key={item.id} value={item.id}>
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.examType && <span className="text-red-600">{errors.examType.message}</span>}
                    </div>
                )}

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

export default SelectCategoryForm