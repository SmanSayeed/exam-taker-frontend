import { apiSlice } from "@/features/api/apiSlice";


export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  // Upload image
  uploadImage: builder.mutation({
    query: (formData) => ({
      url: '/image/upload',
      method: 'POST',
      body: formData, // FormData with image
    }),
  }),

  // Update image
  updateImage: builder.mutation({
    query: ({ id, formData }) => ({
      url: `/image/update/${id}`,
      method: 'POST',
      body: formData, // FormData with image
    }),
  }),

  // Delete image
  deleteImage: builder.mutation({
    query: (id) => ({
      url: `/image/delete/${id}`,
      method: 'DELETE',
    }),
  }),

  // Get all images
  getImages: builder.query({
    query: () => ({
      url: '/images',
      method: 'GET',
    }),
  }),
}),
overrideExisting: false,
    
  
});

export const {
  useUploadImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
  useGetImagesQuery,
} = galleryApi;