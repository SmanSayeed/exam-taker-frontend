import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export const useCategoryData = (category, storageKey) => {
    const { data, isLoading, error } = useGetQuestionsCategoryQuery(category);
    const [selected, setSelected] = useLocalStorage({ key: storageKey, defaultValue: '' });
    const [categoryData, setCategoryData] = useState(null);
    const [selectedCatName, setSelectedCatName] = useState("");

    useEffect(() => {
        if (selected && data?.data?.data) {
            const foundData = data.data.data.find(item => item.id == selected);
            setCategoryData(foundData || null);
            setSelectedCatName(foundData.title);
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
        setCategoryData,
        selectedCatName,
        setSelectedCatName
    };
};