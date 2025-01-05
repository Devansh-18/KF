import React from 'react';
import ProductInformationForm from './ProductInformation/ProductInformationForm';

const AddProduct = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg border border-gray-300 rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-tight">
          Add Product
        </h1>
        <div className="space-y-6">
          <ProductInformationForm />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
