import { useState } from "react";
import { AutoSearchSelect } from "../AutoSearchSelect";
import { useCategoryData } from "../createquestion/useCategoryData";

export default function SelectCategoryForPackage({ control, setValue, setSelectedSection, setSelectedExamType, setSelectedExamSubType }) {

    const [visibleFields, setVisibleFields] = useState({
        section: true,
        exam_type: true,
        exam_sub_type: true,
    });

    const { data: sections, selected: selectedSection, isLoading, error, categoryData: sectionData, setCategoryData: setSectionData } = useCategoryData("sections", "selectedSection");

    const { data: examTypes, selected: selectedExamType, categoryData: examTypeData, setCategoryData: setExamTypeData } = useCategoryData("exam-types", "selectedExamType");

    const { selected: selectedExamSubType } = useCategoryData("exam-sub-types", "selectedExamSubType");

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
            setSelectedSection(id)
            setValue("section", id)
        }
    }

    const handleExamTypeChange = (id) => {
        if (examTypes) {
            const foundData = examTypes.find(item => item.id == id);
            setExamTypeData(foundData || null);
            setSelectedExamType(id)
            setValue("exam_type", id)
        }
    }

    const handleExamSubTypeChange = (id) => {
        setSelectedExamSubType(id)
        setValue("exam_sub_type", id)
    };

    if (isLoading) {
        return <div className="flex items-center justify-center">Sections Loading...</div>;
    }

    if (error) {
        return <div>Failed to sections load: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, defaultValue, rules, disabled }) => (
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
    );

    {/* Section → Exam Type → Exam Sub Type */ }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  fle flex-col md:flex-row gap-6">
            {renderSelectField({
                label: "Section",
                name: "section",
                options: sections,
                onChange: handleSectionChange,
                defaultValue: selectedSection,
            })}

            {sectionData?.exam_types && renderSelectField({
                label: "Exam Type",
                name: "exam_type",
                options: sectionData.exam_types,
                onChange: handleExamTypeChange,
                defaultValue: selectedExamType,
                disabled: !sectionData
            })}

            {examTypeData?.exam_sub_types && renderSelectField({
                label: "Exam Sub Type",
                name: "exam_sub_type",
                options: examTypeData.exam_sub_types,
                onChange: handleExamSubTypeChange,
                defaultValue: selectedExamSubType,
                disabled: !examTypeData
            })}
        </div>
    );
}