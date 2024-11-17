import { apiSlice } from "@/features/api/apiSlice";

export const questionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuestions: builder.query({
            query: ({ page, per_page }) => `que/all?page=${page}&per_page=${per_page}`,
        }),
        getSingleQuestions: builder.query({
            query: (id) => `/que/single/${id}`,
        }),
        createQuestion: builder.mutation({
            query: (data) => ({
                url: "/que/create",
                method: "POST",
                body: data,
            }),
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `que/delete-question/${id}`,
                method: "DELETE",
            }),
        }),
        editQuestion: builder.mutation({
            query: ({ id, data }) => ({
                url: `que/update/${id}`,
                method: "PUT",
                body: data
            }),
        }),
        deleteMcqOption: builder.mutation({
            query: (id) => ({
                url: `/que/delete-mcq-option/${id}`,
                method: "DELETE",
            }),
        }),
        questionSearch: builder.query({
            query: ({keyword, type, section_id, exam_type_id, exam_sub_type_id,group_id,  level_id, subject_id, lesson_id, topic_id, sub_topic_id, perPage}) => ({
                url: `/que/all?keyword=${keyword}&type[]=${type}&section_id[]=${section_id}&exam_type_id[]=${exam_type_id}&exam_sub_type_id[]=${exam_sub_type_id}&group_id[]=${group_id}&level_id[]=${level_id}&subject_id[]=${subject_id}&lesson_id[]=${lesson_id}&topic_id[]=${topic_id}&sub_topic_id[]=${sub_topic_id}&perPage=${perPage}`,
                method: "GET"
            })
        }),
        // questionSearch: builder.query({
        //     query: (data) => ({
        //         url: "/que/search",
        //         method: "GET",
        //         params: data
        //     })
        // }),
    }),
});

export const {
    useCreateQuestionMutation,
    useGetQuestionsQuery,
    useDeleteQuestionMutation,
    useEditQuestionMutation,
    useQuestionSearchQuery,
    useDeleteMcqOptionMutation,
    useGetSingleQuestionsQuery
} = questionsApi;