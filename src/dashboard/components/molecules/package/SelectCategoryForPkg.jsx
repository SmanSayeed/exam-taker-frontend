import { AutoSearchSelect } from "@/components/autosearch-select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryData } from "@/dashboard/hooks/useCategoryData";
import { useState } from "react";

export function SelectCategoryForPkg({ control, setValue, setSelectedSection, setSelectedExamType, setSelectedExamSubType }) {

    const [visibleFields, setVisibleFields] = useState({
        pkgSection: true,
        pkgExamType: true,
        pkgExamSubType: true,
    });

    const { data: sections, selected: selectedSection, isLoading, error, categoryData: sectionData, setCategoryData: setSectionData } = useCategoryData("sections", "pkgSection");

    const { data: examTypes, selected: selectedExamType, categoryData: examTypeData, setCategoryData: setExamTypeData } = useCategoryData("exam-types", "pkgExamType");

    const { selected: selectedExamSubType } = useCategoryData("exam-sub-types", "pkgExamSubType");

    const handleRemoveField = (fieldName) => {
        setVisibleFields((prev) => ({ ...prev, [fieldName]: false }));

        setValue(fieldName, "");
        clearSelectedState(fieldName);
    };

    const clearSelectedState = (fieldName) => {
        switch (fieldName) {
            case "pkgSection":
                setSelectedSection("");
                setSectionData(null);
                break;
            case "pkgExamType":
                setSelectedExamType("");
                setExamTypeData(null);
                break;
            case "pkgExamSubType":
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
            setVisibleFields((prev) => ({ ...prev, pkgExamType: true }));
            setValue("pkgSection", id);
        }
    }

    const handleExamTypeChange = (id) => {
        if (examTypes) {
            const foundData = examTypes.find(item => item.id == id);
            setExamTypeData(foundData || null);
            setSelectedExamType(id);
            setVisibleFields((prev) => ({ ...prev, pkgExamSubType: true }));
            setValue("pkgExamType", id);
        }
    }

    const handleExamSubTypeChange = (id) => {
        setSelectedExamSubType(id);
        setValue("pkgExamSubType", id);
    };

    if (error) {
        return <div>Failed to sections load: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, defaultValue, rules, disabled }) => {
        // If no options are available, don't render the selector
        if (!options || options.length === 0) {
            return null;
        }

        return (
            visibleFields[name] && (
                <AutoSearchSelect
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
                />
            )
        )
    };

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
                name: "pkgSection",
                options: sections,
                onChange: handleSectionChange,
                defaultValue: selectedSection,
            })}

            {sectionData?.exam_types && renderSelectField({
                label: "Exam Type",
                name: "pkgExamType",
                options: sectionData.exam_types,
                onChange: handleExamTypeChange,
                defaultValue: selectedExamType,
                disabled: !sectionData
            })}

            {examTypeData?.exam_sub_types && renderSelectField({
                label: "Exam Sub Type",
                name: "pkgExamSubType",
                options: examTypeData.exam_sub_types,
                onChange: handleExamSubTypeChange,
                defaultValue: selectedExamSubType,
                disabled: !examTypeData
            })}
        </div>
    );
}