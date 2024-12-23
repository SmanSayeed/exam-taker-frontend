import { SearchableSelect } from "@/components/searchable-select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useCategoryData } from "../../../hooks/useCategoryData";

export default function SelectCategoryForPackage({ control, setValue, initialCategory = {} }) {

    const [visibleFields, setVisibleFields] = useState({
        section: true,
        exam_type: true,
        exam_sub_type: true,
    });

    const {
        isLoading,
        error,
        data: sections,
        selected: selectedSection,
        setSelected: setSelectedSection,
        categoryData: sectionData,
        setCategoryData: setSectionData,
        selectedCatName: selectedSectionName,
        setSelectedCatName: setSelectedSectionName
    } = useCategoryData("sections", "pkgSection");

    const {
        data: examTypes,
        selected: selectedExamType,
        setSelected: setSelectedExamType,
        categoryData: examTypeData,
        setCategoryData: setExamTypeData,
        selectedCatName: selectedExamTypeName,
        setSelectedCatName: setSelectedExamTypeName
    } = useCategoryData("exam-types", "pkgExamType");

    const {
        selected: selectedExamSubType,
        setSelected: setSelectedExamSubType,
        selectedCatName: selectedExamSubTypeName,
        setSelectedCatName: setSelectedExamSubTypeName
    } = useCategoryData("exam-sub-types", "pkgExamSubTye");

    const handleRemoveField = (fieldName) => {
        setVisibleFields((prev) => ({ ...prev, [fieldName]: false }));

        setValue(fieldName, "");
        clearSelectedState(fieldName);
    };

    const clearSelectedState = (fieldName) => {
        switch (fieldName) {
            case "section":
                setSelectedSection("");
                setSectionData(null);
                break;
            case "exam_type":
                setSelectedExamType("");
                setExamTypeData(null);
                break;
            case "exam_sub_type":
                setSelectedExamSubType("");
                break;
            default:
                break;
        }
    };

    const handleSectionChange = (id) => {
        if (sections) {
            const foundData = sections.find(item => item.id == id);
            setSectionData(foundData || null);
            setSelectedSection(id);
            setValue("section", id);
            setVisibleFields((prev) => ({ ...prev, exam_type: true }));
        }
    }

    const handleExamTypeChange = (id) => {
        if (examTypes) {
            const foundData = examTypes.find(item => item.id == id);
            setExamTypeData(foundData || null);
            setSelectedExamType(id);
            setValue("exam_type", id);
            setVisibleFields((prev) => ({ ...prev, exam_sub_type: true }));
        }
    }

    const handleExamSubTypeChange = (id) => {
        setSelectedExamSubType(id)
        setValue("exam_sub_type", id)
    };

    if (error) {
        return <div>Failed to sections load: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, defaultValue, rules, disabled, setSelectedCatId, selectedCatName, setSelectedCatName }) => {
        // If no options are available, don't render the selector
        if (!options || options.length === 0) {
            return null;
        }

        return (
            visibleFields[name] && (
                <SearchableSelect
                    label={label}
                    name={name}
                    control={control}
                    options={options}
                    placeholder={`Select ${label}`}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    rules={rules}
                    disabled={disabled}
                    onRemove={() => handleRemoveField(name)}
                    setSelectedCatId={setSelectedCatId}
                    selectedCatName={selectedCatName}
                    setSelectedCatName={setSelectedCatName}
                />
            )
        )
    };

    {/* Section → Exam Type → Exam Sub Type */ }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  fle flex-col md:flex-row gap-6">
            {
                isLoading && (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[250px]" />
                    </div>
                )
            }

            {renderSelectField({
                label: "Section",
                name: "section",
                options: sections,
                onChange: handleSectionChange,
                defaultValue: initialCategory?.section_id || selectedSection,
                setSelectedCatId: setSelectedSection,
                selectedCatName: selectedSectionName,
                setSelectedCatName: setSelectedSectionName,
            })}

            {sectionData?.exam_types && renderSelectField({
                label: "Exam Type",
                name: "exam_type",
                options: sectionData.exam_types,
                onChange: handleExamTypeChange,
                defaultValue: initialCategory?.exam_type_id || selectedExamType,
                setSelectedCatId: setSelectedExamType,
                selectedCatName: selectedExamTypeName,
                setSelectedCatName: setSelectedExamTypeName,
                disabled: !sectionData
            })}

            {examTypeData?.exam_sub_types && renderSelectField({
                label: "Exam Sub Type",
                name: "exam_sub_type",
                options: examTypeData.exam_sub_types,
                onChange: handleExamSubTypeChange,
                defaultValue: initialCategory?.exam_sub_type_id || selectedExamSubType,
                setSelectedCatId: setSelectedExamSubType,
                selectedCatName: selectedExamSubTypeName,
                setSelectedCatName: setSelectedExamSubTypeName,
                disabled: !examTypeData
            })}
        </div>
    );
}