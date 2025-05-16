import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const token = useSelector((state) =>
    state.auth.user ? state.auth.user.token : null,
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
