import { apiSlice } from "./api/apiSlice";

// Расширяем базовый API для постов
export const postsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 👇 Запрос всех постов
    getPosts: builder.query({
      query: () => "/posts", // 👈 URL: /posts
    }),
    // 👇 Запрос одного поста по ID
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    // 👇 Создание поста
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
    }),
    // 👇 Удаление поста
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Автоматически генерируем хуки 👇
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
