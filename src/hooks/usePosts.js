import { useGetArticlesQuery } from "../api/blogApi";
import { useState } from "react";

/**
 * Хук для работы со списком статей
 * @param {number} [initialPage=1] - Начальная страница
 * @param {number} [pageSize=5] - Количество статей на странице
 * @returns {{
 *   posts: array,
 *   isLoading: boolean,
 *   error: object|null,
 *   totalPages: number,
 *   currentPage: number,
 *   setPage: function
 * }}
 */
export const usePosts = (initialPage = 1, pageSize = 5) => {
  const [page, setPage] = useState(initialPage);
  const { data, isLoading, error } = useGetArticlesQuery({
    page,
    pageSize,
  });

  return {
    posts: data?.articles || [],
    isLoading,
    error,
    totalPages: Math.ceil((data?.articlesCount || 0) / pageSize),
    currentPage: page,
    setPage,
  };
};
