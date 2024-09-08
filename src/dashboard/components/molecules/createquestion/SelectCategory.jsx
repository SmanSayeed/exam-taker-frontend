import { useState } from "react";
import SelectField from "./SelectField";
import { useCategoryData } from "./useCategoryData";

export default function SelectCategory({ control, setValue, setSelectedSection, setSelectedExamType, setSelectedExamSubType, setSelectedGroup, setSelectedLesson, setSelectedLevel, setSelectedSubject, setSelectedTopic, setSelectedSubTopic, setSelectedYear }) {

    const [visibleFields, setVisibleFields] = useState({
        section: true,
        exam_type: true,
        exam_sub_type: true,
        group: true,
        level: true,
        subject: true,
        lesson: true,
        topic: true,
        sub_topic: true,
        year: true,
    });

    const { data: sections, selected: selectedSection, isLoading, error, categoryData: sectionData, setCategoryData: setSectionData } = useCategoryData("sections", "selectedSection");
    const { data: examTypes, selected: selectedExamType, categoryData: examTypeData, setCategoryData: setExamTypeData } = useCategoryData("exam-types", "selectedExamType");
    const { selected: selectedExamSubType } = useCategoryData("exam-sub-types", "selectedExamSubType");
    const { data: groups, selected: selectedGroup, categoryData: groupData, setCategoryData: setGroupData } = useCategoryData("groups", "selectedGroup");
    const { data: levels, selected: selectedLevel, categoryData: levelData, setCategoryData: setLevelData } = useCategoryData("levels", "selectedLevel");
    const { data: subjects, selected: selectedSubject, categoryData: subjectData, setCategoryData: setSubjectData } = useCategoryData("subjects", "selectedSubject");
    const { data: lessons, selected: selectedLesson, categoryData: lessonData, setCategoryData: setLessonData } = useCategoryData("lessons", "selectedLesson");
    const { data: topics, selected: selectedTopic, categoryData: topicData, setCategoryData: setTopicData } = useCategoryData("topics", "selectedTopic");
    const { selected: selectedSubTopic } = useCategoryData("sub-topics", "selectedSubTopic");
    const { data: years, selected: selectedYear } = useCategoryData("years", "selectedYear");

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
            case "group":
                setSelectedGroup("");
                setGroupData(null);
                break;
            case "level":
                setSelectedLevel("");
                setLevelData(null);
                break;
            case "subject":
                setSelectedSubject("");
                setSubjectData(null);
                break;
            case "lesson":
                setSelectedLesson("");
                setLessonData(null);
                break;
            case "topic":
                setSelectedTopic("");
                setTopicData(null);
                break;
            case "sub_topic":
                setSelectedSubTopic("");
                break;
            case "year":
                setSelectedYear("");
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
        setValue("exam_su_type", id)
    };

    const handleGroupChange = (id) => {
        if (groups) {
            const foundData = groups.find(item => item.id == id);
            setGroupData(foundData || null);
            setSelectedGroup(id)
            setValue("group", id)
        }
    }

    const handleLevelChange = (id) => {
        if (levels) {
            const foundData = levels.find(item => item.id == id);
            setLevelData(foundData || null);
            setSelectedLevel(id)
            setValue("level", id)
        }
    }

    const handleLessonChange = (id) => {
        if (lessons) {
            const foundData = lessons.find(item => item.id == id);
            setLessonData(foundData || null);
            setSelectedLesson(id)
            setValue("lesson", id)
        }
    }

    const handleSubjectChange = (id) => {
        if (subjects) {
            const foundData = subjects.find(item => item.id == id);
            setSubjectData(foundData || null);
            setSelectedSubject(id)
            setValue("subject", id)
        }
    }

    const handleTopicChange = (id) => {
        if (topics) {
            const foundData = topics.find(item => item.id == id);
            setTopicData(foundData || null);
            setSelectedTopic(id)
            setValue("topic", id)
        }
    }

    const handleSubTopicChange = (id) => {
        setSelectedSubTopic(id)
        setValue("sub_topic", id)
    };

    const handleYearChange = (id) => {
        setSelectedYear(id)
        setValue("year", id)
    };

    if (isLoading) {
        return <div>Loading sections...</div>;
    }

    if (error) {
        return <div>Error loading sections: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, defaultValue, rules, disabled }) => (
        visibleFields[name] && (
            <SelectField
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

    return (
        <div className="space-y-4 mt-4">
            {/* Section → Exam Type → Exam Sub Type */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
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

            {/* Group → Level → Subject → Lesson → Topic → Sub Topic */}
            <div className="grid md:grid-cols-3 gap-2">
                {renderSelectField({
                    label: "Group",
                    name: "group",
                    options: groups,
                    onChange: handleGroupChange,
                    defaultValue: selectedGroup,
                })}

                {groupData?.levels && renderSelectField({
                    label: "Level",
                    name: "level",
                    options: groupData.levels,
                    onChange: handleLevelChange,
                    defaultValue: selectedLevel,
                    disabled: !groupData
                })}

                {levelData?.subjects && renderSelectField({
                    label: "Subject",
                    name: "subject",
                    options: levelData.subjects,
                    onChange: handleSubjectChange,
                    defaultValue: selectedSubject,
                    disabled: !levelData
                })}

                {subjectData?.lessons && renderSelectField({
                    label: "Lesson",
                    name: "lesson",
                    options: subjectData.lessons,
                    onChange: handleLessonChange,
                    defaultValue: selectedLesson,
                    disabled: !subjectData
                })}

                {lessonData?.topics && renderSelectField({
                    label: "Topic",
                    name: "topic",
                    options: lessonData.topics,
                    onChange: handleTopicChange,
                    defaultValue: selectedTopic,
                    disabled: !lessonData
                })}

                {topicData?.sub_topics && renderSelectField({
                    label: "Sub Topic",
                    name: "sub_topic",
                    options: topicData.sub_topics,
                    onChange: handleSubTopicChange,
                    defaultValue: selectedSubTopic,
                    disabled: !topicData
                })}
            </div>

            {/* Year */}
            <div className="pt-4">
                {renderSelectField({
                    label: "Year",
                    name: "year",
                    options: years,
                    onChange: handleYearChange,
                    defaultValue: selectedYear,
                })}
            </div>
        </div>
    );
}
