import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editProductData } from '../../../services/operations/productApi';
import { resetProductState } from '../../../slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_STATUS } from '../../../utils/constants';

const PublishProduct = () => {
  const {
    getValues,
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.status === PRODUCT_STATUS.PUBLISHED) {
      setValue('public', true);
    }
  }, [product, setValue]);

  const goToProduct = () => {
    dispatch(resetProductState());
    navigate('/');
  };

  const handleProductPublish = async () => {
    if (
      (product?.status === PRODUCT_STATUS.PUBLISHED && getValues('public')) ||
      (product?.status === PRODUCT_STATUS.DRAFT && !getValues('public'))
    ) {
      goToProduct();
      return;
    }
    const formData = new FormData();
    formData.append('productId', product?._id);
    const productStatus = getValues('public') ? PRODUCT_STATUS.PUBLISHED : PRODUCT_STATUS.DRAFT;
    formData.append('status', productStatus);
    setLoading(true);
    const result = await editProductData(formData, token);
    if (result) {
      goToProduct();
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handleProductPublish();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Publish Product</h1>
        <div className="mb-6">
          <label htmlFor="public" className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="public"
              {...register('public')}
              className="w-5 h-5 text-blue-500 focus:border-2 focus:border-blue-300 rounded"
            />
            <span className="text-gray-700 text-sm">Make this product public</span>
          </label>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 ${
              loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg focus:outline-none focus:border-2 focus:border-blue-300 ${
              loading ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishProduct;
