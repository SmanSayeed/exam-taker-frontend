import { apiSlice } from "@/features/api/apiSlice";
// import { saveStudent, deleteStudent } from "./studentsSlice";

export const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
    }),
    getSingleStudent: builder.query({
      query: (id) => `/students/${id}`,
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students",
        method: "POST",
        body: data,
      }),
    }),
    editStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: data,
      }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       const { data: result } = await queryFulfilled;
    //       dispatch(
    //         saveStudent({
    //           id: result.data.id,
    //           name: result.data.name,
    //           email: result.data.email,
    //           phone: result.data.phone,
    //           country: result.data.country,
    //           country_code: result.data.country_code,
    //           address: result.data.address,
    //           active_status: result.data.active_status,
    //         })
    //       );
    //     } catch (err) {
    //       console.error("Error updating student", err);
    //     }
    //   },
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     try {
    //       await queryFulfilled;
    //       dispatch(deleteStudent(arg.id));
    //     } catch (err) {
    //       console.error("Error deleting student", err);
    //     }
    //   },
    }),
    changeStudentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/students/${id}/status`,
        method: "PATCH",
        body: { active_status: status },
      }),
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
  useChangeStudentStatusMutation,
} = studentsApi;
