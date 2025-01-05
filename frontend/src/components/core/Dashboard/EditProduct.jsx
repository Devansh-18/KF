import React, { useEffect, useState } from "react";
import ProductInformationForm from "./AddProduct/ProductInformation/ProductInformationForm";
import { setProduct, setEditProduct } from "../../../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../../../services/operations/productApi";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector((state) => state.product.product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchProductDetails(productId);
        console.log("Fetched product data:", data);
        if (data && data.length > 0) {
          dispatch(setProduct(data[0]));
          dispatch(setEditProduct(true));
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId, dispatch]);

  if (loading) {
    return (
      <div className="grid place-items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center h-screen px-4">
        <p className="text-red-600 text-lg font-semibold text-center">{error}</p>
        <button
          className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-md"
          onClick={() => navigate("/products")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="grid place-items-center h-screen px-4">
        <p className="text-red-600 text-lg font-semibold text-center">No product data available</p>
        <button
          className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-md"
          onClick={() => navigate("/products")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex items-start justify-center gap-6 p-5">
      <div className="flex flex-col w-full max-w-3xl border border-black rounded-lg gap-4 p-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">Edit Product</h1>
        <div className="flex-1">
          <ProductInformationForm product={product} />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
