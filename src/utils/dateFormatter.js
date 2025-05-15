/**
 * Форматирует дату в удобочитаемый вид (пример: "15 мая 2023")
 * @param {string} isoString - Дата в ISO формате
 * @returns {string} Отформатированная дата
 */
export const formatDate = (isoString) => {
  if (!isoString) return "Дата не указана";

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  try {
    const date = new Date(isoString);
    if (isNaN(date)) return "Некорректная дата";

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch {
    return "Ошибка формата даты";
  }
};

/**
 * Форматирует дату в относительный вид (пример: "2 дня назад")
 * @param {string} isoString - Дата в ISO формате
 * @returns {string} Относительное время
 */
export const formatRelativeTime = (isoString) => {
  if (!isoString) return "";

  const now = new Date();
  const date = new Date(isoString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    год: 31536000,
    месяц: 2592000,
    неделя: 604800,
    день: 86400,
    час: 3600,
    минута: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${getRussianPluralEnding(interval)} назад`;
    }
  }

  return "только что";
};

// Вспомогательная функция для склонений
const getRussianPluralEnding = (number) => {
  if (number % 100 >= 11 && number % 100 <= 14) return "";

  switch (number % 10) {
    case 1:
      return "";
    case 2:
    case 3:
    case 4:
      return "а";
    default:
      return "";
  }
};
