import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useCategoryDataForEdit = (category) => {
    const { data, isLoading, error } = useGetQuestionsCategoryQuery(category);
    const selectedCategories = useSelector((state) => state.selectedCategories);
    console.log(selectedCategories)
    const [selected, setSelected] = useState(null);
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        if (selected && data?.data?.data) {
            const foundData = data.data.data.find(item => item.id == selected);
            setCategoryData(foundData || null);
        } else {
            setCategoryData(null);
        }
    }, [selected, data]);

    return { 
        data: data?.data?.data || [], 
        selected,
        setSelected,
        isLoading, 
        error, 
        categoryData, 
        setCategoryData 
    };
};