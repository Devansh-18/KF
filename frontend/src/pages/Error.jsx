import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-red-50 via-white to-gray-100">
      <div className="text-center p-6 max-w-md bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-gray-700">
          An error has occurred. Please try restarting the website.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-300"
        >
          Restart Website
        </button>
      </div>
    </div>
  );
};

export default Error;
