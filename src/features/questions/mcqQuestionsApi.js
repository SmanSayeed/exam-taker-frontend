import { apiSlice } from "@/features/api/apiSlice";

export const mcqQuestionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMcqQuestion: builder.mutation({
            query: (data) => ({
                url: "/que/mcq",
                method: "POST",
                body: data,
            }),

            // async onQueryStarted(arg, { queryFulfilled, dispatch }) {

            //     try {
            //         const result = await queryFulfilled;

            //         dispatch(
            //             saveQuestion({
            //                 question_id: result.data.data.id,
            //                 title: result.data.data.title,
            //                 description: result.data.data.description,
            //                 type: result.data.data.type,
            //                 mark: result.data.data.mark,
            //                 images: result.data.data.images,
            //                 is_paid: result.data.data.is_paid,
            //                 is_featured: result.data.data.is_featured,
            //                 status: result.data.data.status
            //             })
            //         );
            //     } catch (err) {
            //         console.log(err);
            //     }
            // },
        }),
    }),
});

export const { useCreateMcqQuestionMutation } = mcqQuestionsApi;