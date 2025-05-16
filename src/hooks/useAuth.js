import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser, logout as logoutAction } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const checkAuth = () => {
    if (user?.token) {
      dispatch(fetchCurrentUser());
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated: !!user?.token,
    isLoading: loading,
    error,
    checkAuth,
    logout,
  };
};
