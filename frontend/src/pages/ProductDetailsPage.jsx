import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../services/operations/productApi";
import { FaEdit } from "react-icons/fa";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate(); // For navigation

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const data = await fetchProductDetails(productId);
                console.log("Fetched product data:", data);
                setProduct(data.length > 0 ? data[0] : null);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="text-blue-600 font-semibold mt-4">
                    Loading product details...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <p className="text-center text-red-600 text-lg">
                    Unable to load product details. The product might be unavailable or
                    there was an error in fetching details.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg mt-10 bg-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-full md:w-1/2">
                    <img
                        src={product.thumbnail}
                        alt={product.productName}
                        className="rounded-lg shadow-lg w-full h-auto"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {product.productName}
                    </h1>
                    <p className="text-gray-600 text-lg mb-4">
                        <span className="font-semibold">Description: </span>
                        {product.productDescription}
                    </p>
                    <p className="text-gray-600 text-lg mb-4">
                        <span className="font-semibold">Price: </span>₹{product.price}
                    </p>
                    <p className="text-gray-600 text-lg mb-4">
                        <span className="font-semibold">Quantity: </span>
                        {product.quantity}
                    </p>
                    {token && user && user?.accountType === ACCOUNT_TYPE.ADMIN && (
                    <button
                        onClick={() => navigate(`/editproduct/${productId}`)}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                    >
                      <span className=" flex justify-center items-center gap-2"><FaEdit /> Edit</span> 
                    </button>)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
