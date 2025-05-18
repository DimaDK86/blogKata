/**
 * Форматирует дату в удобочитаемый вид
 * @param {string|Date} date - Дата для форматирования
 * @param {object} [options] - Дополнительные параметры
 * @param {boolean} [options.relative=false] - Использовать относительное время (например, "2 часа назад")
 * @param {string} [options.locale='en-US'] - Локаль для форматирования
 * @returns {string} Отформатированная дата
 */
export const formatDate = (date, options = {}) => {
  const { relative = false, locale = "en-US" } = options;
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (relative) {
    return getRelativeTime(dateObj, locale);
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

// Вспомогательная функция для относительного времени
const getRelativeTime = (date, locale) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second");
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, "minute");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, "hour");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, "day");
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, "month");
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, "year");
};

// Дополнительные утилиты для работы с датами
export const dateUtils = {
  isToday: (date) => {
    const today = new Date();
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  },
  isYesterday: (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return (
      dateObj.getDate() === yesterday.getDate() &&
      dateObj.getMonth() === yesterday.getMonth() &&
      dateObj.getFullYear() === yesterday.getFullYear()
    );
  },
};
