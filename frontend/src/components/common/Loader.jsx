import React, { useEffect, useState } from 'react';

const Loader = ({ categoryName, onAnimationEnd }) => {
  
  const midIndex = Math.floor(categoryName.length / 2);
  const firstHalf = categoryName.substring(0, midIndex);
  const secondHalf = categoryName.substring(midIndex);

  useEffect(() => {
    // Set a timeout to trigger the end of the animation
    const timer = setTimeout(() => {
      onAnimationEnd();
    }, 4000); // Animation duration: 4 seconds

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 w-screen">
      <div className="flex w-full">
        <span className="text-white text-4xl sm:text-6xl font-bold animate-slide-in-left">
          {firstHalf}
        </span>
        <span className="text-white w-[50vw] text-4xl sm:text-6xl font-bold animate-slide-in-right">
          {secondHalf}
        </span>
      </div>
    </div>
  );
};

export default Loader;