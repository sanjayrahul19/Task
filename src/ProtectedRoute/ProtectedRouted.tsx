import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProtectedRouteProps } from "../Types/route";
import { RootState } from "../Redux/Store.ts";
import Cookies from "js-cookie";
import { setAuthenticated } from "../Redux/AuthSlice.tsx";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Check if the user is authenticated from the Redux store
  const token = Cookies.get("token"); // Get the auth token from cookies
  const currentUser = useSelector((state: RootState) => state.auth.currentUser); // Get the current user from the Redux store

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

  // If user is not authenticated or token/currentUser is missing, redirect to login page
  if (!isAuthenticated || !token || !currentUser) {
    return <Navigate to="/login" />;
  }

   // If user is authenticated, render the protected route element
  return element;
};

export default ProtectedRoute;
