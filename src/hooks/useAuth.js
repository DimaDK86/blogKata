import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Хук для работы с авторизацией
 * @returns {{
 *   user: object|null,
 *   isAuthenticated: boolean,
 *   isLoading: boolean,
 *   error: string|null,
 *   checkAuth: function
 * }}
 */
export const useAuth = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuth = () => {
    dispatch(fetchUser());
  };

  useEffect(() => {
    if (!user && !loading) {
      checkAuth();
    }
  }, [user, loading]);

  return {
    user,
    isAuthenticated: !!user?.token,
    isLoading: loading,
    error,
    checkAuth,
  };
};
