import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated Number */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200 animate-pulse">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-indigo-50 rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Message with fade-in animation */}
        <div className="mt-8 space-y-3 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-800">Oops! Page not found</h2>
          <p className="text-gray-600 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Buttons with hover effects */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group px-6 py-2.5 rounded-lg border border-gray-300 hover:border-gray-400 
              flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="group px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 
              flex items-center gap-2 text-white transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-4 -right-4 w-72 h-72 bg-indigo-50 rounded-full 
          blur-3xl opacity-50 animate-blob"
        />
        <div
          className="absolute -bottom-4 -left-4 w-72 h-72 bg-purple-50 rounded-full 
          blur-3xl opacity-50 animate-blob animation-delay-2000"
        />
      </div>
    </div>
  );
};

export default NotFound;
