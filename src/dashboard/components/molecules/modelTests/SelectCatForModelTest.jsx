import { useState } from "react";
import { useCategoryData } from "../createquestion/useCategoryData";
import { AutoSearchSelect } from "./AutoSearchSelect";

export default function SelectCatForModelTest({ control, setValue, setSelectedGroup, setSelectedLesson, setSelectedLevel, setSelectedSubject, setSelectedTopic, setSelectedSubTopic, setSelectedYear }) {

    const [visibleFields, setVisibleFields] = useState({
        group: true,
        level: true,
        subject: true,
        lesson: true,
        topic: true,
        sub_topic: true,
        year: true,
    });

    const { data: groups, selected: selectedGroup, categoryData: groupData, setCategoryData: setGroupData } = useCategoryData("groups", "group");
    const { data: levels, selected: selectedLevel, categoryData: levelData, setCategoryData: setLevelData } = useCategoryData("levels", "level");
    const { data: subjects, selected: selectedSubject, categoryData: subjectData, setCategoryData: setSubjectData } = useCategoryData("subjects", "subject");
    const { data: lessons, selected: selectedLesson, categoryData: lessonData, setCategoryData: setLessonData } = useCategoryData("lessons", "lesson");
    const { data: topics, selected: selectedTopic, categoryData: topicData, setCategoryData: setTopicData } = useCategoryData("topics", "topic");
    const { selected: selectedSubTopic } = useCategoryData("sub-topics", "sub_topic");

    const handleRemoveField = (fieldName) => {
        setVisibleFields((prev) => ({ ...prev, [fieldName]: false }));

        setValue(fieldName, "");
        clearSelectedState(fieldName);
    };

    const clearSelectedState = (fieldName) => {
        switch (fieldName) {
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

    const handleSubjectChange = (id) => {
        if (subjects) {
            const foundData = subjects.find(item => item.id == id);
            setSubjectData(foundData || null);
            setSelectedSubject(id)
            setValue("subject", id)
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

    return (
        <div className="space-y-4 mt-4">
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
        </div>
    );
}