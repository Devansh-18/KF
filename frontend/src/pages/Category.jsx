import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories, getCategoryPageDetails } from "../services/operations/productApi";
import Error from "./Error";
import ProductCards from "../components/core/CategoryPage/ProductCards";
import Loader from "../components/common/Loader";
import Spinner from "../components/common/Spinner";

const Category = () => {
  const { categoryName } = useParams();
  const [categoryId, setCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const showName = categoryName?.split("-").join(" ").toUpperCase();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        const catalog = res.find(
          (ct) =>
            ct.name.toLowerCase().split(" ").join("") ===
            categoryName.toLowerCase()
        );
        const catalogId = catalog?._id;
        setCategoryId(catalogId);
        setError(!catalogId ? "Category not found" : null);
      } catch (err) {
        setError("Unable to fetch categories. Please try again later.");
      }
    };
    getCategories();
  }, [categoryName]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const result = await getCategoryPageDetails(categoryId);
        setCategoryData(result);
      } catch (err) {
        setError("Failed to fetch category details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {categoryData && (
        <div className="flex flex-col items-center py-16 px-4 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800  drop-shadow-lg transform transition-all hover:scale-105">
              {categoryData?.selectedCategory?.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              {categoryData?.selectedCategory?.description}
            </p>
          </div>

          {/* Breadcrumb Navigation */}
          <div className="flex space-x-2 text-lg font-semibold text-blue-600">
            <a href="/" className="hover:text-blue-800">Home</a>
            <span>/category/</span>
            <p  className="text-orange-600">{categoryData?.selectedCategory?.name}</p>
          </div>

          {/* Products Section */}
          <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-100 pb-2">
              Available Products
            </h2>
            <ProductCards products={categoryData?.selectedCategory?.product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
