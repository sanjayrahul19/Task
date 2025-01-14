import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthState, User } from "../Types/auth";

// Retrieve token and current user from localStorage if they exist
const initialState: AuthState = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser") ?? "null"), // Get currentUser from localStorage
  token: Cookies.get("token") || null, // Get token from cookies
  isAuthenticated: !!Cookies.get("token"), // Check if token exists
  errorMessage: null,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, password } = action.payload;
      const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");

      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        state.error = true;
        state.errorMessage = "User already exists";
      } else {
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        state.users = users;
        state.error = false;
        state.errorMessage = "";
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        const token = `session-token-${Date.now()}`;
        Cookies.set("token", token, { expires: 1 });

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

    logout: (state) => {
      Cookies.remove("token");
      localStorage.removeItem("currentUser"); // Remove user data from localStorage
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = false;
      state.errorMessage = "";
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const { signup, login, logout, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
