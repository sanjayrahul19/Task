import React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load components
const Login = lazy(() => import("./Pages/Auth/Login.tsx"));
const Loader = lazy(() => import("./Components/Common/Loader.tsx"));
const Home = lazy(() => import("./Pages/Home/Home.tsx"));
const Navbar = lazy(() => import("./Components/Common/NavBar.tsx"));
const NotFound =lazy(() => import("./Pages/NotFound/NotFound.tsx"));
const MovieDetail = lazy(() => import("./Pages/MovieDetail/MovieDetail.tsx"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute/ProtectedRouted.tsx"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
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
