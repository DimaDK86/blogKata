import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingIndicator />;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};
