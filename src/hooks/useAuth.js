import { useSelector, useDispatch, useCallback } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const checkAuth = useCallback(() => {
    if (!user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated: !!user?.token,
    isLoading: loading,
    checkAuth,
  };
};
