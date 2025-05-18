import { Alert } from "antd";
import PropTypes from "prop-types";
import styles from "./ErrorAlert.module.css";

/**
 * Компонент для отображения ошибок в едином стиле
 * @param {Object} error - Объект ошибки
 * @param {string} [className] - Дополнительные CSS-классы
 * @param {boolean} [showIcon=true] - Показывать иконку
 * @param {boolean} [closable=false] - Возможность закрыть алерт
 * @param {function} [onClose] - Обработчик закрытия алерта
 * @param {string} [type='error'] - Тип алерта (error|warning|info|success)
 */
const ErrorAlert = ({
  error,
  className = "",
  showIcon = true,
  closable = false,
  onClose,
  type = "error",
}) => {
  if (!error) return null;

  // Форматирование сообщения об ошибке
  const getErrorMessage = () => {
    if (typeof error === "string") return error;
    if (error.message) return error.message;
    if (error.data?.errors) {
      const errors = error.data.errors;
      return typeof errors === "object"
        ? Object.entries(errors).map(
            ([key, msgs]) => `${key}: ${msgs.join(", ")}`,
          )
        : errors.toString();
    }
    return "An unknown error occurred";
  };

  return (
    <Alert
      className={`${styles.error} ${className}`}
      message={getErrorMessage()}
      description={error.status && `Status: ${error.status}`}
      type={type}
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
    />
  );
};

ErrorAlert.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      status: PropTypes.number,
      message: PropTypes.string,
      data: PropTypes.shape({
        errors: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
          PropTypes.array,
        ]),
      }),
    }),
  ]),
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(["error", "warning", "info", "success"]),
};

export default ErrorAlert;
