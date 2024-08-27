import { useState, useEffect } from 'react';
import { useGetQuestionsCategoryQuery } from '@/features/questions/questionsCategoryApi';
import MultiSelectCategory from './MultiSelectCategory';

export default function FilterQuestionsByCategory() {
    const [selectedSections, setSelectedSections] = useState({});

    const { data: sectionData, isLoading: isLoadingSections, isSuccess: isSuccessSections } = useGetQuestionsCategoryQuery("sections");
    const sections = sectionData?.data?.data?.map(item => item?.title) || [];
    // const sections = sectionData?.data?.data || {}

    const { data: examTypeData, isLoading: isLoadingExamTypes, isSuccess: isSuccessExamTypes } = useGetQuestionsCategoryQuery("exam-types");
    const examTypes = examTypeData?.data?.data?.map(item => item?.title) || [];
    // const examTypes = examTypeData?.data?.data || [];

    const { data: subjectData, isLoading: isLoadingSubjects, isSuccess: isSuccessSubjects } = useGetQuestionsCategoryQuery("subjects");
    const subjects = subjectData?.data?.data?.map(item => item?.title) || [];
    // const subjects = subjectData?.data?.data || [] ;

    const { data: lessonsData, isLoading: isLoadingLessons, isSuccess: isSuccessLessons } = useGetQuestionsCategoryQuery("lessons");
    const lessons = lessonsData?.data?.data?.map(item => item?.title) || [];
    // const lessons = lessonsData?.data?.data|| [];

    const { data: topicsData, isLoading: isLoadingTopics, isSuccess: isSuccessTopics } = useGetQuestionsCategoryQuery("topics");
    const topics = topicsData?.data?.data?.map(item => item?.title) || [];
    // const topics = topicsData?.data?.data || [];

    const handleCategoryChange = (selectedCategories, label) => {
        setSelectedSections(prevSelectedSections => ({
            ...prevSelectedSections,
            [label]: selectedCategories
        }));
    };

    // Monitor state changes with useEffect
    useEffect(() => {
        // console.log("Selected sections updated:", selectedSections);
    }, [selectedSections]);

    if (isLoadingSections || isLoadingExamTypes || isLoadingSubjects || isLoadingLessons || isLoadingTopics) {
        return <div>Loading...</div>;
    }

    if (!isSuccessSections || !isSuccessExamTypes || !isSuccessSubjects || !isSuccessLessons || !isSuccessTopics) {
        return <div>Failed to load data.</div>;
    }


    return (
        <div className="flex flex-wrap items-center justify-around gap-3 border4 border-white">
            <MultiSelectCategory
                options={sections}
                label="Sections"
                onChange={(selected) => handleCategoryChange(selected, "Sections")}
            />
            <MultiSelectCategory
                options={examTypes}
                label="Exam Types"
                onChange={(selected) => handleCategoryChange(selected, "Exam Types")}
            />
            <MultiSelectCategory
                options={subjects}
                label="Subjects"
                onChange={(selected) => handleCategoryChange(selected, "Subjects")}
            />
            <MultiSelectCategory
                options={lessons}
                label="Lessons"
                onChange={(selected) => handleCategoryChange(selected, "Lessons")}
            />
            <MultiSelectCategory
                options={topics}
                label="Topics"
                onChange={(selected) => handleCategoryChange(selected, "Topics")}
            />
        </div>
    );
}