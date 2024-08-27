import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useState } from "react";
import SelectField from "./SelectField";

const SelectCategory = ({ control }) => {
    const [sectionData, setSectionData] = useState(null);
    const [examTypeData, setExamTypeData] = useState(null);
    const [groupData, setGroupData] = useState(null);
    const [levelData, setLevelData] = useState(null);
    const [subjectData, setSubjectData] = useState(null);
    const [lessonData, setLessonData] = useState(null);
    const [topicData, setTopicData] = useState(null);

    const { data: sectionsData, isLoading, error } = useGetQuestionsCategoryQuery("sections");
    const { data: examTypesData } = useGetQuestionsCategoryQuery("exam-types");
    const { data: groupsData } = useGetQuestionsCategoryQuery("groups");
    const { data: levelsData } = useGetQuestionsCategoryQuery("levels");
    const { data: subjectsData } = useGetQuestionsCategoryQuery("subjects");
    const { data: lessonsData } = useGetQuestionsCategoryQuery("lessons");
    const { data: topicsData } = useGetQuestionsCategoryQuery("topics");
    const { data: yearsData } = useGetQuestionsCategoryQuery("years");

    const handleSectionChange = (sectionId) => {
        if (sectionsData?.data?.data) {
            const sectionDataById = sectionsData?.data?.data.find(item => item?.id == sectionId);
            setSectionData(sectionDataById || null);
        }
    };

    const handleExamTypeChange = (examTypeId) => {
        if (examTypesData?.data?.data) {
            const examTypeDataById = examTypesData?.data?.data.find(item => item?.id == examTypeId);
            setExamTypeData(examTypeDataById || null);
        }
    };

    const handleGroupChange = (groupId) => {
        if (groupsData?.data?.data) {
            const groupDataById = groupsData?.data?.data.find(item => item?.id == groupId);
            setGroupData(groupDataById || null);
        }
    };

    const handleLevelChange = (levelId) => {
        if (levelsData?.data?.data) {
            const levelDataById = levelsData?.data?.data.find(item => item?.id == levelId);
            setLevelData(levelDataById || null);
        }
    };

    const handleSubjectChange = (subjectId) => {
        if (subjectsData?.data?.data) {
            const subjectDataById = subjectsData?.data?.data.find(item => item?.id == subjectId);
            setSubjectData(subjectDataById || null);
        }
    };

    const handleLessonChange = (lessonId) => {
        if (lessonsData?.data?.data) {
            const lessonDataById = lessonsData?.data?.data.find(item => item?.id == lessonId);
            setLessonData(lessonDataById || null);
        }
    };

    const handleTopicChange = (topicId) => {
        if (topicsData?.data?.data) {
            const topicDataById = topicsData?.data?.data.find(item => item?.id == topicId);
            setTopicData(topicDataById || null);
        }
    };

    if (isLoading) {
        return <div>Loading sections...</div>;
    }

    if (error) {
        return <div>Error loading sections: {error.message}</div>;
    }

    return (
        <div className="space-y-4 mt-4">
            {/* Section → exam_types → exam_sub_types */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <SelectField
                    label="Section"
                    name="section"
                    control={control}
                    options={sectionsData?.data?.data || []}
                    placeholder="Select Section"
                    onChange={handleSectionChange}
                    rules={{ required: "Section is required" }}
                />

                {sectionData && sectionData.exam_types && (
                    <SelectField
                        label="Exam Type"
                        name="exam_type"
                        control={control}
                        options={sectionData.exam_types}
                        placeholder="Select Exam Type"
                        onChange={handleExamTypeChange}
                        rules={{ required: "Exam Type is required" }}
                        disabled={!sectionData}
                    />
                )}

                {examTypeData && examTypeData.exam_sub_types && (
                    <SelectField
                        label="Exam Sub Type"
                        name="exam_sub_type"
                        control={control}
                        options={examTypeData.exam_sub_types}
                        placeholder="Select Exam Sub Type"
                        rules={{ required: "Exam Sub Type is required" }}
                        disabled={!examTypeData}
                    />
                )}
            </div>

            {/* Group → Level → Subject → lesson → topics → sub_topics */}
            <div className="grid md:grid-cols-3 gap-2">
                <SelectField
                    label="Group"
                    name="group"
                    control={control}
                    options={groupsData?.data?.data || []}
                    placeholder="Select Group"
                    onChange={handleGroupChange}
                    rules={{ required: "Group is required" }}
                />

                {groupData && groupData.levels && (
                    <SelectField
                        label="Level"
                        name="level"
                        control={control}
                        options={groupData.levels}
                        placeholder="Select Level"
                        onChange={handleLevelChange}
                        rules={{ required: "Level is required" }}
                        disabled={!groupData}
                    />
                )}

                {levelData && levelData.subjects && (
                    <SelectField
                        label="Subject"
                        name="subject"
                        control={control}
                        options={levelData.subjects}
                        onChange={handleSubjectChange}
                        placeholder="Select Subject"
                        rules={{ required: "Subject is required" }}
                        disabled={!levelData}
                    />
                )}

                {subjectData && subjectData.lessons && (
                    <SelectField
                        label="Lesson"
                        name="lesson"
                        control={control}
                        options={subjectData.lessons}
                        onChange={handleLessonChange}
                        placeholder="Select Lesson"
                        rules={{ required: "Lesson is required" }}
                        disabled={!subjectData}
                    />
                )}

                {lessonData && lessonData.topics && (
                    <SelectField
                        label="Topic"
                        name="topic"
                        control={control}
                        options={lessonData.topics}
                        onChange={handleTopicChange}
                        placeholder="Select Topic"
                        rules={{ required: "Topic is required" }}
                        disabled={!lessonData}
                    />
                )}

                {topicData && topicData.sub_topics && (
                    <SelectField
                        label="Sub Topic"
                        name="sub_topic"
                        control={control}
                        options={topicData.sub_topics}
                        placeholder="Select Sub Topic"
                        rules={{ required: "Sub Topic is required" }}
                        disabled={!topicData}
                    />
                )}
            </div>

            {/* year */}
            <div className="pt-4">
                <SelectField
                    label="Year"
                    name="year"
                    control={control}
                    options={yearsData?.data?.data || []}
                    placeholder="Select Year"
                    rules={{ required: "Year is required" }}
                />
            </div>
        </div>
    );
};

export default SelectCategory;
