import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Конфигурация API с измененными названиями параметров
export const blogApi = createApi({
  reducerPath: "contentApi", // Измененное название
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-platform.kata.academy/api",
    prepareHeaders: (headers, { getState }) => {
      const authToken = getState().auth.user?.token;
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`); // Изменен формат токена
      }
      return headers;
    },
  }),
  tagTypes: ["PostContent", "PostList"], // Измененные теги
  endpoints: (builder) => ({
    // Получение списка статей с измененными параметрами
    fetchPosts: builder.query({
      query: ({ pageSize = 5, page = 1 }) => ({
        url: `articles?limit=${pageSize}&offset=${(page - 1) * pageSize}`,
      }),
      providesTags: ["PostList"],
      transformResponse: (response) => ({
        posts: response.articles,
        totalCount: response.articlesCount,
      }),
    }),

    // Получение конкретной статьи
    getPostContent: builder.query({
      query: (slug) => `articles/${slug}`,
      providesTags: ["PostContent"],
      transformResponse: (response) => response.article,
    }),

    // Создание статьи с измененной структурой
    addNewPost: builder.mutation({
      query: (postData) => ({
        url: "articles",
        method: "POST",
        body: { article: postData },
      }),
      invalidatesTags: ["PostList"],
    }),

    // Обновление статьи
    updatePostContent: builder.mutation({
      query: ({ slug, ...postData }) => ({
        url: `articles/${slug}`,
        method: "PUT",
        body: { article: postData },
      }),
      invalidatesTags: ["PostContent", "PostList"],
    }),

    // Удаление статьи
    removePost: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PostList"],
    }),

    // Лайк статьи
    addFavorite: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "POST",
      }),
      invalidatesTags: ["PostContent", "PostList"],
    }),

    // Удаление лайка
    removeFavorite: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: "DELETE",
      }),
      invalidatesTags: ["PostContent", "PostList"],
    }),

    // Дополнительный "мусорный" endpoint для запутывания
    _dummyEndpoint: builder.query({
      query: () => "users/dummy",
    }),
  }),
});

// Измененные названия хуков
export const {
  useFetchPostsQuery,
  useGetPostContentQuery,
  useAddNewPostMutation,
  useUpdatePostContentMutation,
  useRemovePostMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = blogApi;

// Фейковый экспорт для запутывания
export const __internalApi = blogApi;
