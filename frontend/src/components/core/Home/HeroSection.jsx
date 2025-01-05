import React from "react";
import { Link, Navigate } from "react-router-dom";

import Heroimg from '../../../assets/images/heroImg.avif'
const HeroSection = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
              backgroundImage: `url(${Heroimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative container mx-auto px-6 lg:px-20 py-16">
        <div className="lg:flex lg:items-center lg:justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-6 text-white">
            <h1 className="text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-200">
              Embrace the Art of Fragrance
            </h1>
            <p className="text-3xl font-semibold text-white">
              Products That You Fall In Love With
            </p>
            <p className="text-lg opacity-90">
              Find the perfect one for every requirement or connect with us to
              learn more about our exquisite collection.
            </p>
            <div className="flex space-x-4">
              <Link to={'/contact'}>
              <button  
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-pink-400 transition-all">
                Contact Us 
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
