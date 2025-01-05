import React from "react";
import { useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-200">
      <div className="text-center">
        {/* Illustration */}
        <div className="mb-8 flex justify-center items-center text-indigo-600">
          <MdError className="w-24 h-24" />
        </div>
        {/* Main Text */}
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
