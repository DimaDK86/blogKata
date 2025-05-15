import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  return user?.token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
