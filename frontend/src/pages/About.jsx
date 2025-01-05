import React from "react";
import { FaRegHandshake, FaLeaf, FaSmileBeam } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-200 opacity-85"></div>
        <div className="relative max-w-7xl mx-auto py-20 px-6 text-center sm:py-24 sm:px-12 lg:px-16">
          <h1 className="text-5xl font-bold ">
            Explore the World of Fragrance
          </h1>
          <p className="mt-6 text-xl ">
            At <span className="font-semibold ">KHUSHI FRAGRANCES</span>, we offer a collection of products. Our fragrances are made to help you express your unique style and personality.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-lg text-indigo-600 font-semibold uppercase">
              About Us
            </h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Variety of Products, Perfect for You
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We believe that every fragrance tells a story. Our collection offers the finest quality products, perfect for personal use.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Authenticity */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100">
                <FaRegHandshake className="text-indigo-600 text-4xl" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Authentic Products</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                We craft our own perfumes, ensuring every product is original, unique, and made with the finest ingredients.
              </p>
            </div>

            {/* Diverse Collection */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100">
                <FaLeaf className="text-pink-600 text-4xl" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">A Scent for Every Mood</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Our collection has a wide range of scents, from fresh florals to deep, woody aromas.
              </p>
            </div>

            {/* Exceptional Service */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-purple-100">
                <FaSmileBeam className="text-purple-600 text-4xl" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Hassle-Free Shopping</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Enjoy fast delivery and excellent customer service every time you shop with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200  py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Find Quality Products?
          </h2>
          <p className="mt-4 text-lg">
            Explore our collection and discover what you need.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/"
              className="bg-white text-indigo-600 hover:text-indigo-700 font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
            >
             Explore Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
