import useLocalStorage from "@/hooks/useLocalStorage";
import SelectField from "./SelectField";
import { useCategoryData } from "./useCategoryData";

const SelectCategory = ({ control }) => {
    const { data: sections, selected: selectedSection, handleChange: handleSectionChange, isLoading, error, categoryData: sectionData } = useCategoryData("sections", "selectedSection");
    const { selected: selectedExamType, handleChange: handleExamTypeChange, categoryData: examTypeData } = useCategoryData("exam-types", "selectedExamType");
    const { data: groups, selected: selectedGroup, handleChange: handleGroupChange, categoryData: groupData } = useCategoryData("groups", "selectedGroup");
    const { selected: selectedLevel, handleChange: handleLevelChange, categoryData: levelData } = useCategoryData("levels", "selectedLevel");
    const { selected: selectedSubject, handleChange: handleSubjectChange, categoryData: subjectData } = useCategoryData("subjects", "selectedSubject");
    const { selected: selectedLesson, handleChange: handleLessonChange, categoryData: lessonData } = useCategoryData("lessons", "selectedLesson");
    const { selected: selectedTopic, handleChange: handleTopicChange, categoryData: topicData } = useCategoryData("topics", "selectedTopic");
    const { data: years, selected: selectedYear, handleChange: handleYearChange } = useCategoryData("years", "selectedYear");

    const [selectedExamSubType, setSelectedSubExamType] = useLocalStorage({ key: 'selectedExamSubType', defaultValue: '' });
    const [selectedSubTopic, setSelectedSubTopic] = useLocalStorage({ key: 'selectedSubTopic', defaultValue: '' });

    const handleSubTypeChange = (id) => setSelectedSubExamType(id);
    const handleSubTopicChange = (id) => setSelectedSubTopic(id);

    if (isLoading) {
        return <div>Loading sections...</div>;
    }

    if (error) {
        return <div>Error loading sections: {error.message}</div>;
    }

    const renderSelectField = ({ label, name, options, onChange, defaultValue, rules, disabled }) => (
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
        />
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
                    rules: { required: "Section is required" },
                })}

                {sectionData?.exam_types && renderSelectField({
                    label: "Exam Type",
                    name: "exam_type",
                    options: sectionData.exam_types,
                    onChange: handleExamTypeChange,
                    defaultValue: selectedExamType,
                    rules: { required: "Exam Type is required" },
                    disabled: !sectionData
                })}

                {examTypeData?.exam_sub_types && renderSelectField({
                    label: "Exam Sub Type",
                    name: "exam_sub_type",
                    options: examTypeData.exam_sub_types,
                    onChange: handleSubTypeChange,
                    defaultValue: selectedExamSubType,
                    rules: { required: "Exam Sub Type is required" },
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
                    rules: { required: "Group is required" },
                })}

                {groupData?.levels && renderSelectField({
                    label: "Level",
                    name: "level",
                    options: groupData.levels,
                    onChange: handleLevelChange,
                    defaultValue: selectedLevel,
                    rules: { required: "Level is required" },
                    disabled: !groupData
                })}

                {levelData?.subjects && renderSelectField({
                    label: "Subject",
                    name: "subject",
                    options: levelData.subjects,
                    onChange: handleSubjectChange,
                    defaultValue: selectedSubject,
                    rules: { required: "Subject is required" },
                    disabled: !levelData
                })}

                {subjectData?.lessons && renderSelectField({
                    label: "Lesson",
                    name: "lesson",
                    options: subjectData.lessons,
                    onChange: handleLessonChange,
                    defaultValue: selectedLesson,
                    rules: { required: "Lesson is required" },
                    disabled: !subjectData
                })}

                {lessonData?.topics && renderSelectField({
                    label: "Topic",
                    name: "topic",
                    options: lessonData.topics,
                    onChange: handleTopicChange,
                    defaultValue: selectedTopic,
                    rules: { required: "Topic is required" },
                    disabled: !lessonData
                })}

                {topicData?.sub_topics && renderSelectField({
                    label: "Sub Topic",
                    name: "sub_topic",
                    options: topicData.sub_topics,
                    onChange: handleSubTopicChange,
                    defaultValue: selectedSubTopic,
                    rules: { required: "Sub Topic is required" },
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
                    rules: { required: "Year is required" },
                })}
            </div>
        </div>
    );
};

export default SelectCategory;
