import { AutoSearchSelectForEdit } from "@/components/autosearch-select-edit";
import { Skeleton } from "@/components/ui/skeleton";
import { setSelectedExamSubType, setSelectedExamType, setSelectedSection } from "@/features/questions/selectedCategoriesSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCategoryDataForEdit } from "../questionedit/useCategoryDataForEdit";

export function SelectCatForPkgEdit({ control, setValue }) {
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.selectedCategories);

    const [visibleFields, setVisibleFields] = useState({
        pkgSection: true,
        pkgExamType: true,
        pkgExamSubType: true,
    });

    const { data: sections, isLoading: isSectionLoading, error, categoryData: sectionData, setCategoryData: setSectionData } = useCategoryDataForEdit("sections", "selectedSection");
    const { data: examTypes, categoryData: examTypeData, setCategoryData: setExamTypeData } = useCategoryDataForEdit("exam-types", "selectedExamType");

    const handleRemoveField = (fieldName) => {
        setVisibleFields((prev) => ({ ...prev, [fieldName]: false }));

        setValue(fieldName, "");
        clearSelectedState(fieldName);
    };

    const clearSelectedState = (fieldName) => {
        switch (fieldName) {
            case "pkgSection":
                dispatch(setSelectedSection({ selectedSection: "" }));
                setSectionData(null);
                break;
            case "pkgExamType":
                dispatch(setSelectedExamType({ selectedExamType: "" }));
                setExamTypeData(null);
                break;
            case "pkgExamSubType":
                dispatch(setSelectedExamSubType({ selectedExamSubType: "" }));
                break;
            default:
                break;
        }
    };

    const handleSectionChange = (id) => {
        if (sections) {
            const foundData = sections.find(item => item.id == id);
            setSectionData(foundData || null);
            dispatch(setSelectedSection({ selectedSection: id }));
            setValue("pkgSection", id);
            setVisibleFields((prev) => ({ ...prev, pkgExamType: true }));
        }
    }

    const handleExamTypeChange = (id) => {
        if (examTypes) {
            const foundData = examTypes.find(item => item.id == id);
            setExamTypeData(foundData || null);
            dispatch(setSelectedExamType({ selectedExamType: id }));
            setValue("pkgExamType", id);
            setVisibleFields((prev) => ({ ...prev, pkgExamSubType: true }));
        }
    }

    const handleExamSubTypeChange = (id) => {
        dispatch(setSelectedExamSubType({ selectedExamSubType: id }));
        setValue("pkgExamSubType", id);
    };

    if (error) {
        return <div>Error loading sections: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, selectedValue, rules, disabled }) => {

        if (!options || options.length === 0) {
            return null; // Do not render the field if options are not available
        }

        return (
            visibleFields[name] && (
                <AutoSearchSelectForEdit
                    label={label}
                    name={name}
                    control={control}
                    options={options}
                    placeholder={`Select ${label}`}
                    onChange={onChange}
                    selectedValue={selectedValue}
                    rules={rules}
                    disabled={disabled}
                    onRemove={() => handleRemoveField(name)}
                />
            )
        )
    };

    return (
        <div className="space-y-4 mt-4">
            {/* Section → Exam Type → Exam Sub Type */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {
                    isSectionLoading && (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[250px]" />
                        </div>
                    )
                }

                {renderSelectField({
                    label: "Section",
                    name: "pkgSection",
                    options: sections,
                    onChange: handleSectionChange,
                    selectedValue: selectedCategories.selectedSection,
                })}

                {sectionData?.exam_types && renderSelectField({
                    label: "Exam Type",
                    name: "pkgExamType",
                    options: sectionData.exam_types,
                    onChange: handleExamTypeChange,
                    selectedValue: selectedCategories.selectedExamType,
                    disabled: !sectionData
                })}

                {examTypeData?.exam_sub_types && renderSelectField({
                    label: "Exam Sub Type",
                    name: "pkgExamSubType",
                    options: examTypeData.exam_sub_types,
                    onChange: handleExamSubTypeChange,
                    selectedValue: selectedCategories.selectedExamSubType,
                    disabled: !examTypeData
                })}
            </div>
        </div>
    );
}
