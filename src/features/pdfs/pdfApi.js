import { apiSlice } from "@/features/api/apiSlice";

export const pdfApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all PDFs
    getPdfs: builder.query({
      query: () => ({
        url: "/pdfs",
        method: "GET",
      }),
      providesTags: ["Pdfs"],
    }),

    // Fetch single PDF by ID
    getPdfById: builder.query({
      query: (id) => ({
        url: `/pdfs/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Pdfs", id }],
    }),

    // Create a new PDF
    createPdf: builder.mutation({
      query: (newPdf) => ({
        url: "/pdfs",
        method: "POST",
        body: newPdf,
      }),
      invalidatesTags: ["Pdfs"],
    }),

    // Update a PDF by ID
    updatePdf: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pdfs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Pdfs", id }],
    }),

    // Delete a PDF by ID
    deletePdf: builder.mutation({
      query: (id) => ({
        url: `/pdfs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pdfs"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetPdfsQuery,
  useGetPdfByIdQuery,
  useCreatePdfMutation,
  useUpdatePdfMutation,
  useDeletePdfMutation,
} = pdfApi;
