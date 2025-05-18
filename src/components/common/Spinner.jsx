import { Spin } from "antd";
import PropTypes from "prop-types";
import styles from "./Spinner.module.css";

/**
 * Компонент индикатора загрузки
 * @param {string} [size='large'] - Размер (small|default|large)
 * @param {string} [tip] - Текст подсказки
 * @param {boolean} [fullscreen=false] - На весь экран
 * @param {string} [className] - Дополнительные CSS-классы
 * @param {string} [spinnerClassName] - Класс для самого спиннера
 * @param {object} [style] - Инлайн-стили
 */
const Spinner = ({
  size = "large",
  tip,
  fullscreen = false,
  className = "",
  spinnerClassName = "",
  style,
}) => {
  const spinner = (
    <Spin
      size={size}
      tip={tip}
      className={`${styles.spinner} ${spinnerClassName}`}
      style={style}
    />
  );

  return fullscreen ? (
    <div className={`${styles.fullscreenWrapper} ${className}`}>{spinner}</div>
  ) : (
    <div className={`${styles.inlineWrapper} ${className}`}>{spinner}</div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "default", "large"]),
  tip: PropTypes.string,
  fullscreen: PropTypes.bool,
  className: PropTypes.string,
  spinnerClassName: PropTypes.string,
  style: PropTypes.object,
};

export default Spinner;
