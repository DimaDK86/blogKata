import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user?.token]);

  return {
    user,
    isAuthenticated: !!user?.token,
    isLoading: loading,
    error,
    checkAuth: () => dispatch(fetchCurrentUser()),
  };
};
