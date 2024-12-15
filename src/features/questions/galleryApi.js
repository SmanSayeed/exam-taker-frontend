import { apiSlice } from "@/features/api/apiSlice";

const formatParams = (params) => {
  const formattedParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formattedParams.append(`${key}[]`, item);
      });
    } else {
      formattedParams.append(key, value);
    }
  });

  return formattedParams.toString();
};

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  // Upload image
  uploadImage: builder.mutation({
    query: (formData) => ({
      url: '/admin/image/upload',
      method: 'POST',
      body: formData, // FormData with image
    }),
  }),

  // Update image
  updateImage: builder.mutation({
    query: ({ id, formData }) => ({
      url: `/admin/image/update/${id}`,
      method: 'PUT',
      body: formData, // FormData with image
    }),
  }),

  // Delete image
  deleteImage: builder.mutation({
    query: (id) => ({
      url: `/admin/image/delete/${id}`,
      method: 'DELETE',
    }),
  }),

  // Get all images
  getImages: builder.query({
    query: () => ({
      url: '/admin/images',
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