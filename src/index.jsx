import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Получаем корневой элемент
const container = document.getElementById("root");

// Проверяем наличие корневого элемента
if (!container) {
  throw new Error("Root container not found");
}

// Создаем корневой рендерер
const root = createRoot(container);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Отчет о веб-виталиях (опционально)
if (process.env.NODE_ENV === "production") {
  import("./webVitals").then(({ reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}
