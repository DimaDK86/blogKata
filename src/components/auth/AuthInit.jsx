import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/slices/authSlice";

const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return children;
};

export default AuthInit;
