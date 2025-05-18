import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://blog-platform.kata.academy/api";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Исправлено: было user?.token
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Article", "User"],
  endpoints: (builder) => ({
    // Articles endpoints
    getArticles: builder.query({
      query: ({ limit = 5, offset = 0, tag, author, favorited }) => {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);
        if (tag) params.append("tag", tag);
        if (author) params.append("author", author);
        if (favorited) params.append("favorited", favorited);

        return { url: `/articles?${params.toString()}` };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }) => ({ type: "Article", slug })),
              { type: "Article", id: "LIST" },
            ]
          : [{ type: "Article", id: "LIST" }],
    }),

    getArticle: builder.query({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Article", slug }],
    }),

    createArticle: builder.mutation({
      query: (articleData) => ({
        url: "/articles",
        method: "POST",
        body: { article: articleData },
      }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),

    updateArticle: builder.mutation({
      query: ({ slug, ...articleData }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        body: { article: articleData },
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: "Article", slug }],
    }),

    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, slug) => [{ type: "Article", slug }],
    }),

    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: (result, error, slug) => [{ type: "Article", slug }],
    }),

    unfavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, slug) => [{ type: "Article", slug }],
    }),

    // User endpoints
    getCurrentUser: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "PUT",
        body: { user: userData },
      }),
      invalidatesTags: ["User"],
    }),

    // Authentication endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { user: credentials },
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: { user: userData },
      }),
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useLoginMutation,
  useRegisterMutation,
} = blogApi;
