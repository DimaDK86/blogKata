import { Pagination } from "antd";

export const PaginationControls = ({ current, total, onChange }) => {
  return (
    <Pagination
      current={current}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
      pageSize={5}
    />
  );
};
