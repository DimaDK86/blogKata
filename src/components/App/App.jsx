import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";
import { useAuth } from "../../hooks/useAuth";

export const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingIndicator fullScreen />;
  }

  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
