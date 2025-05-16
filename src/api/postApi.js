import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api",
  }),
  tagTypes: ["Articles", "Article"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset, token = null }) => ({
        url: `articles?limit=${limit}&offset=${offset}`,
        headers: token ? { Authorization: `Token ${token}` } : {},
      }),
      providesTags: ["Articles", "Article"],
    }),
    getArticle: builder.query({
      query: ({ slug, token = null }) => ({
        url: `articles/${slug}`,
        headers: token ? { Authorization: `Token ${token}` } : {},
      }),
      providesTags: ["Articles"],
    }),
    createArticle: builder.mutation({
      query: ({ token, articleData }) => ({
        url: "/articles",
        method: "POST",
        body: { article: articleData },
        headers: { Authorization: `Token ${token}` },
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: ({ token, slug, articleData }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        body: { article: articleData },
        headers: { Authorization: `Token ${token}` },
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: ({ token, slug }) => ({
        url: `articles/${slug}`,
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      }),
      invalidatesTags: ["Article"],
    }),
    likeArticle: builder.mutation({
      query: ({ token, slug }) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      }),
      invalidatesTags: ["Articles"],
    }),
    unlikeArticle: builder.mutation({
      query: ({ token, slug }) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
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
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} = postApi;
