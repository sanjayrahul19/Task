import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedRouteProps } from "../Types/route";
import { RootState } from "../Redux/store.ts";
import Cookies from "js-cookie";
import { setAuthenticated } from "../Redux/AuthSlice.tsx";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = Cookies.get("token");
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  useEffect(() => {
    // Check token and currentUser from localStorage on initial load
    const storedToken = Cookies.get("token");
    const storedUser = JSON.parse(localStorage.getItem("currentUser") ?? "null");

    if (storedToken && storedUser) {
      dispatch(setAuthenticated(true)); // Set the user as authenticated if token and user exist
    } else {
      dispatch(setAuthenticated(false)); // Set the user as not authenticated
    }
  }, [dispatch]);

  if (!isAuthenticated || !token || !currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
