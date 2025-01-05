import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiConnector } from "../../../services/apiconnector";
import { categoryEndpoints } from "../../../services/apis";

const CategoriesSection = () => {
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categoryEndpoints.CATEGORIES_API);
        setSubLinks(res.data.allCategory);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const visibleCategories = showAll ? subLinks : subLinks.slice(0, 6);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return description;
  };

  return (
    <div className="py-16 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center mb-10 ">
          Explore Products
        </h2>
        {loading ? (
          <div className="p-4 text-center text-lg font-medium text-white">Loading...</div>
        ) : subLinks.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {visibleCategories.map((category, index) => (
                <div
                  key={index}
                  className="border rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-gradient-to-r from-blue-100 via-teal-50 to-lime-100"
                >
                  <Link
                    to={`/category/${category.name.split(" ").join("").toLowerCase()}`}
                    className="block p-6"
                  >
                    <div className="p-4 flex flex-col items-center justify-center text-center">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{category.name}</h3>
                      <p className="text-base text-gray-700">
                        {category.description ? truncateDescription(category.description) : "Discover products in this category."}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {subLinks.length > 6 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700 transition duration-300"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 text-center text-white text-lg">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
