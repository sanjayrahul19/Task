import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthState, User } from "../Types/auth";

// Initialize the state by retrieving currentUser and token from localStorage and cookies
const initialState: AuthState = {
  users: [], // Array to hold all registered users
  currentUser: JSON.parse(localStorage.getItem("currentUser") ?? "null"), // Retrieve current user from localStorage (if available)
  token: Cookies.get("token") || null, // Retrieve token from cookies (if available)
  isAuthenticated: !!Cookies.get("token"), // Check if token exists to determine if user is authenticated
  errorMessage: null, // Error message (if any)
  error: false,  // Error flag (indicates if there was an error during authentication)
};

const authSlice = createSlice({
  name: "auth",
  initialState, // Initial state for the slice
  reducers: {
    signup: (state, action) => {
      const { email, password } = action.payload;
      const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");

      // Check if the user already exists
      const userExists = users.find((u) => u.email === email);
      if (userExists) {
         // If user exists, set error state
        state.error = true;
        state.errorMessage = "User already exists";
      } else {
         // If user doesn't exist, create a new user and store it in localStorage
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        state.users = users;
        state.error = false;
        state.errorMessage = "";
      }
    },

     // Login action to authenticate a user
    login: (state, action) => {
      const { email, password } = action.payload;
      const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]"); // Retrieve all registered users from localStorage
      const user = users.find((u) => u.email === email && u.password === password); // Find the user with matching credentials

      if (user) {
         // If user found, create a session token and set it in cookies
        const token = `session-token-${Date.now()}`;
        Cookies.set("token", token, { expires: 1 }); // Set token in cookies with 1-day expiration

        // Save user data to localStorage
        localStorage.setItem("currentUser", JSON.stringify({ email, password }));
        state.currentUser = { email, password };
        state.token = token;
        state.isAuthenticated = true;
        state.error = false;
        state.errorMessage = "";
      } else {
        state.errorMessage = "Invalid credentials";
        state.error = true;
      }
    },

    // Logout action to remove user session
    logout: (state) => {
      Cookies.remove("token"); // Remove token from cookies
      localStorage.removeItem("currentUser"); // Remove user data from localStorage
      state.currentUser = null; // Reset current user in state
      state.token = null;
      state.isAuthenticated = false;
      state.error = false;
      state.errorMessage = "";
    },

     // Set the authentication status in the state
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload; // Set the authentication status based on the action payload
    }
  },
});

// Export the actions to be dispatched
export const { signup, login, logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
