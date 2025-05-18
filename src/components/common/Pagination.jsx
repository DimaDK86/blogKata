import { Pagination as AntPagination } from "antd";
import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import styles from "./Pagination.module.css";

/**
 * Компонент пагинации с оптимизированным рендерингом
 * @param {number} current - Текущая страница
 * @param {number} total - Общее количество элементов
 * @param {number} [pageSize=10] - Количество элементов на странице
 * @param {function} onChange - Обработчик изменения страницы
 * @param {boolean} [showSizeChanger=false] - Показывать селектор размера страницы
 * @param {string} [className] - Дополнительные CSS-классы
 * @param {array} [pageSizeOptions=[5, 10, 20, 50]] - Варианты размеров страниц
 */
const Pagination = memo(
  ({
    current,
    total,
    pageSize = 10,
    onChange,
    showSizeChanger = false,
    className = "",
    pageSizeOptions = [5, 10, 20, 50],
  }) => {
    const handleChange = useCallback(
      (page, size) => {
        onChange(page, size);
      },
      [onChange],
    );

    if (total <= pageSize && !showSizeChanger) return null;

    return (
      <div className={`${styles.paginationWrapper} ${className}`}>
        <AntPagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={handleChange}
          showSizeChanger={showSizeChanger}
          pageSizeOptions={pageSizeOptions}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          className={styles.pagination}
        />
      </div>
    );
  },
);

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  showSizeChanger: PropTypes.bool,
  className: PropTypes.string,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
};

export default Pagination;
