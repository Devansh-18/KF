import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCards = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productDetailsPage/${product._id}`);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <div
      className="bg-white w-60 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:ring-2 hover:ring-blue-500 mx-auto cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="h-40 w-full bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.productName}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-500 transition-colors duration-300">
          {product.productName}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Quantity: <span className="font-medium">{product.quantity}</span>
        </p>
        <p className="text-lg text-blue-600 font-bold mt-2">
          Price: Rs.{product.price}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Description:{' '}
          <span className="font-medium">
            {truncateDescription(product.productDescription, 12)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCards;
