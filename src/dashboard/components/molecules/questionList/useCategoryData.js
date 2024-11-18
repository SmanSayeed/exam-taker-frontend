import { useGetQuestionsCategoryQuery } from "@/features/questions/questionsCategoryApi";
import { useState } from "react";

export const useCategoryData = (category) => {
  const {data: categoriesData, isLoading, error} = useGetQuestionsCategoryQuery(category);
  const [categoryData, setCategoryData] = useState(null);

  return {
    categories: categoriesData?.data?.data,
    categoryData,
    setCategoryData,
    isLoading,
    error,
  };
};
