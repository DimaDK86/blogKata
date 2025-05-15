// В App.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../Header/Header";
import { Outlet } from "react-router-dom";

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuth } = useAuth();

  useEffect(() => {
    const initializeApp = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    initializeApp();
  }, [checkAuth]);

  if (isLoading) {
    return <div className="fullscreen-loader">Загрузка...</div>;
  }

  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};
