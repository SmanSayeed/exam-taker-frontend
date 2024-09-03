import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";

export const useCategoryData = (category, storageKey) => {
    const { data, isLoading, error } = useGetQuestionsCategoryQuery(category);
    const [selected, setSelected] = useLocalStorage({ key: storageKey, defaultValue: '' });
    const [categoryData, setCategoryData] = useState(null);

    useEffect(() => {
        if (selected && data?.data?.data) {
            const foundData = data.data.data.find(item => item.id == selected);
            setCategoryData(foundData || null);
        }
    }, [selected, data]);

    const handleChange = (id) => {
        if (data?.data?.data) {
            const foundData = data.data.data.find(item => item.id == id);
            setCategoryData(foundData || null);
            setSelected(id); // Save to local storage
        }
    };

    return { data: data?.data?.data || [], selected, handleChange, isLoading, error, categoryData };
};