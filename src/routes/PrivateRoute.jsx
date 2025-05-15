import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "../components/UI/Spinner";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }

  if (!user?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
