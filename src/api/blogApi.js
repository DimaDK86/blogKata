import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => `articles?limit=${limit}&offset=${offset}`,
      providesTags: ["Articles"],
    }),
    getArticle: builder.query({
      query: (slug) => `articles/${slug}`,
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: "articles",
        method: "POST",
        body: { article },
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: ({ slug, article }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        body: { article },
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = blogApi;
