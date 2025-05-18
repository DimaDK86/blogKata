import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/common/Spinner";

const PrivateRoute = () => {
  const { user, status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (status === "loading") {
    return <Spinner fullscreen />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
