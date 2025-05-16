import { Pagination } from "antd";
import style from "./Pagination.module.css";
import { useMemo } from "react";

export const MemoizedPaginationPosts = ({
  countPosts,
  handlePageChange,
  currentPage,
}) => {
  const pagination = useMemo(
    () => (
      <Pagination
        align="center"
        defaultCurrent={currentPage}
        onChange={(page) => {
          const offset = page * 5 - 5;
          handlePageChange(offset, page);
        }}
        total={countPosts}
        className={style.pagination}
        showSizeChanger={false}
      />
    ),
    [countPosts, handlePageChange, currentPage],
  );

  return <>{pagination}</>;
};
