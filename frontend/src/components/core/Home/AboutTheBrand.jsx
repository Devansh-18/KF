import React from 'react';
import perfume from '../../../assets/images/Perfume.avif'
const AboutTheBrand = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-12 px-6 md:px-16 lg:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:space-x-10">
        {/* Left: Image */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src={perfume}
            alt="Fragrance bottles"
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Content */}
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About Our Brand
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At <span className="font-semibold">Khushi Fragrances</span>, we are 
            inspired by nature and driven by the art of craftsmanship. For over a decade, 
            we have been curating exquisite products that is useful in day to day life, evoke memories, 
            and capture emotions.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Our commitment to <span className="font-semibold">quality</span> ensures that each 
            of our product is crafted with the finest ingredients, while our dedication to 
            <span className="font-semibold">sustainability</span> reflects our respect for the planet.
          </p>
         
        </div>
      </div>
    </section>
  );
};

export default AboutTheBrand;
