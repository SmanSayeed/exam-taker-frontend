import { Skeleton } from "@/components/ui/skeleton";
import { setSelectedExamSubType, setSelectedExamType, setSelectedGroup, setSelectedLesson, setSelectedLevel, setSelectedSection, setSelectedSubject, setSelectedSubTopic, setSelectedTopic, setSelectedYear } from "@/features/questions/selectedCategoriesSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCategoryData } from "../createquestion/useCategoryData";
import { AutoSearchSelect } from "../modelTests/AutoSearchSelect";

export default function SelectCategoryForEdit({ control, setValue }) {

    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.selectedCategories);
    console.log("selectedCategories", selectedCategories)

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

    const { data: sections, isLoading: isSectionLoading, error, categoryData: sectionData, setCategoryData: setSectionData } = useCategoryData("sections", "section");
    const { data: examTypes, categoryData: examTypeData, setCategoryData: setExamTypeData } = useCategoryData("exam-types", "exam_type");
    const { selected: selectedExamSubType } = useCategoryData("exam-sub-types", "exam_sub_type");
    const { data: groups, isLoading: isGroupLoading, categoryData: groupData, setCategoryData: setGroupData } = useCategoryData("groups", "group");
    const { data: levels, categoryData: levelData, setCategoryData: setLevelData } = useCategoryData("levels", "level");
    const { data: subjects, categoryData: subjectData, setCategoryData: setSubjectData } = useCategoryData("subjects", "subject");
    const { data: lessons, categoryData: lessonData, setCategoryData: setLessonData } = useCategoryData("lessons", "lesson");
    const { data: topics, categoryData: topicData, setCategoryData: setTopicData } = useCategoryData("topics", "topic");
    const { selected: selectedSubTopic } = useCategoryData("sub-topics", "sub_topic");
    const { data: years, isLoading: isYearLoading } = useCategoryData("years", "year");

    const handleRemoveField = (fieldName) => {
        setVisibleFields((prev) => ({ ...prev, [fieldName]: false }));

        setValue(fieldName, "");
        clearSelectedState(fieldName);
    };

    const clearSelectedState = (fieldName) => {
        switch (fieldName) {
            case "section":
                dispatch(setSelectedSection({ selectedSection: "" }));
                setSectionData(null);
                break;
            case "exam_type":
                dispatch(setSelectedExamType({ selectedExamType: "" }));
                setExamTypeData(null);
                break;
            case "exam_sub_type":
                dispatch(setSelectedExamSubType({ selectedExamSubType: "" }));
                break;
            case "group":
                dispatch(setSelectedGroup({ selectedGroup: "" }));
                setGroupData(null);
                break;
            case "level":
                dispatch(setSelectedLevel({ selectedLevel: "" }));
                setLevelData(null);
                break;
            case "subject":
                dispatch(setSelectedSubject({ selectedSubject: "" }));
                setSubjectData(null);
                break;
            case "lesson":
                dispatch(setSelectedLesson({ selectedLesson: "" }));
                setLessonData(null);
                break;
            case "topic":
                dispatch(setSelectedTopic({ selectedTopic: "" }));
                setTopicData(null);
                break;
            case "sub_topic":
                dispatch(setSelectedSubTopic({ selectedSubTopic: "" }));
                break;
            case "year":
                dispatch(setSelectedYear({ selectedYear: "" }));
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
            setValue("section", id);
            setVisibleFields((prev) => ({ ...prev, exam_type: true }));
        }
    }

    const handleExamTypeChange = (id) => {
        if (examTypes) {
            const foundData = examTypes.find(item => item.id == id);
            setExamTypeData(foundData || null);
            dispatch(setSelectedExamType({ selectedExamType: id }));
            setValue("exam_type", id);
            setVisibleFields((prev) => ({ ...prev, exam_sub_type: true }));
        }
    }

    const handleExamSubTypeChange = (id) => {
        dispatch(setSelectedExamSubType({ selectedExamSubType: id }));
        setValue("exam_sub_type", id);
    };

    const handleGroupChange = (id) => {
        if (groups) {
            const foundData = groups.find(item => item.id == id);
            setGroupData(foundData || null);
            dispatch(setSelectedGroup({ selectedGroup: id }));
            setValue("group", id);
            setVisibleFields((prev) => ({ ...prev, level: true }));
        }
    }

    const handleLevelChange = (id) => {
        if (levels) {
            const foundData = levels.find(item => item.id == id);
            setLevelData(foundData || null);
            dispatch(setSelectedLevel({ selectedLevel: id }));
            setValue("level", id);
            setVisibleFields((prev) => ({ ...prev, subject: true }));
        }
    }

    const handleSubjectChange = (id) => {
        if (subjects) {
            const foundData = subjects.find(item => item.id == id);
            setSubjectData(foundData || null);
            dispatch(setSelectedSubject({ selectedSubject: id }));
            setValue("subject", id);
            setVisibleFields((prev) => ({ ...prev, lesson: true }));
        }
    }

    const handleLessonChange = (id) => {
        if (lessons) {
            const foundData = lessons.find(item => item.id == id);
            setLessonData(foundData || null);
            dispatch(setSelectedLesson({ selectedLesson: id }));
            setValue("lesson", id);
            setVisibleFields((prev) => ({ ...prev, topic: true }));
        }
    }

    const handleTopicChange = (id) => {
        if (topics) {
            const foundData = topics.find(item => item.id == id);
            setTopicData(foundData || null);
            dispatch(setSelectedTopic({ selectedTopic: id }));
            setValue("topic", id);
            setVisibleFields((prev) => ({ ...prev, sub_topic: true }));
        }
    }

    const handleSubTopicChange = (id) => {
        dispatch(setSelectedSubTopic({ selectedSubTopic: id }))
        setValue("sub_topic", id)
    };

    const handleYearChange = (id) => {
        dispatch(setSelectedYear({ selectedYear: id }))
        setValue("year", id)
    };

    if (error) {
        return <div>Error loading sections: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, selectedValue, rules, disabled }) => {
        // If no options are available, don't render the selector
        if (!selectedValue) {
            return null;
        }

        console.log(`Rendering ${name}, visible: ${visibleFields[name]}`);

        return (
            visibleFields[name] && (
                <AutoSearchSelect
                    label={label}
                    name={name}
                    control={control}
                    options={options}
                    placeholder={`Select ${label}`}
                    onChange={onChange}
                    defaultValue={selectedValue}
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
                    name: "section",
                    options: sections,
                    onChange: handleSectionChange,
                    selectedValue: selectedCategories.selectedSection,
                })}

                {sectionData?.exam_types && renderSelectField({
                    label: "Exam Type",
                    name: "exam_type",
                    options: sectionData.exam_types,
                    onChange: handleExamTypeChange,
                    selectedValue: selectedCategories.selectedExamType,
                    disabled: !sectionData
                })}

                {examTypeData?.exam_sub_types && renderSelectField({
                    label: "Exam Sub Type",
                    name: "exam_sub_type",
                    options: examTypeData.exam_sub_types,
                    onChange: handleExamSubTypeChange,
                    selectedValue: selectedCategories.selectedExamSubType,
                    disabled: !examTypeData
                })}
            </div>

            {/* Group → Level → Subject → Lesson → Topic → Sub Topic */}
            <div className="grid md:grid-cols-3 gap-2">
                {
                    isGroupLoading && (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[250px]" />
                        </div>
                    )
                }

                {renderSelectField({
                    label: "Group",
                    name: "group",
                    options: groups,
                    onChange: handleGroupChange,
                    selectedValue: selectedCategories.selectedGroup,
                })}

                {groupData?.levels && renderSelectField({
                    label: "Level",
                    name: "level",
                    options: groupData.levels,
                    onChange: handleLevelChange,
                    selectedValue: selectedCategories.selectedLevel,
                    disabled: !groupData
                })}

                {levelData?.subjects && renderSelectField({
                    label: "Subject",
                    name: "subject",
                    options: levelData.subjects,
                    onChange: handleSubjectChange,
                    selectedValue: selectedCategories.selectedSubject,
                    disabled: !levelData
                })}

                {subjectData?.lessons && renderSelectField({
                    label: "Lesson",
                    name: "lesson",
                    options: subjectData.lessons,
                    onChange: handleLessonChange,
                    selectedValue: selectedCategories.selectedLesson,
                    disabled: !subjectData
                })}

                {lessonData?.topics && renderSelectField({
                    label: "Topic",
                    name: "topic",
                    options: lessonData.topics,
                    onChange: handleTopicChange,
                    selectedValue: selectedCategories.selectedTopic,
                    disabled: !lessonData
                })}

                {topicData?.sub_topics && renderSelectField({
                    label: "Sub Topic",
                    name: "sub_topic",
                    options: topicData.sub_topics,
                    onChange: handleSubTopicChange,
                    selectedValue: selectedCategories.selectedSubTopic,
                    disabled: !topicData
                })}
            </div>

            {/* Year */}
            <div className="pt-4">
                {
                    isYearLoading && (
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[250px]" />
                        </div>
                    )
                }

                {renderSelectField({
                    label: "Year",
                    name: "year",
                    options: years,
                    onChange: handleYearChange,
                    selectedValue: selectedCategories.selectedYear,
                })}
            </div>
        </div>
    );
}
