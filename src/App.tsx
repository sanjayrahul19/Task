import React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load components
const Login = lazy(() => import("./Pages/Auth/Login.tsx"));
const Loader = lazy(() => import("./Components/Common/Loader.tsx"));
const Home = lazy(() => import("./Pages/Home/Home.tsx"));
const Navbar = React.lazy(() => import("./Components/Common/NavBar.tsx"));
const NotFound = React.lazy(() => import("./Pages/NotFound/NotFound.tsx"));
const MovieDetail = React.lazy(() => import("./Pages/MovieDetail/MovieDetail.tsx"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute/ProtectedRouted.tsx"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer aria-label="Toast notifications" />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/movie/:id" element={<ProtectedRoute element={<MovieDetail />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
