import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import {
  fetchCategories,
  createProductDetails,
  editProductData,
} from "../../../../../services/operations/productApi";
import Upload from "../Upload";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, setEditProduct } from "../../../../../slices/productSlice";
import { useNavigate } from "react-router-dom";

const ProductInformationForm = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { product, editProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCategories();
      setCategories(categories);
      setLoading(false);
    };

    getCategories();

    if (editProduct && product) {
      setValue("productTitle", product.productName || "");
      setValue("productDesc", product.productDescription || "");
      setValue("productPrice", product.price || "");
      setValue("productQuantity", product.quantity || "");
      setValue("productCategory", product.category?._id || "");
      setValue("productThumbnail", product.thumbnail || "");
    }
  }, [editProduct, product, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productTitle);
    formData.append("productDescription", data.productDesc);
    formData.append("quantity", data.productQuantity);
    formData.append("price", data.productPrice);
    formData.append("category", data.productCategory);
    formData.append("thumbnailImage", data.productThumbnail);
  
    if (editProduct) {
      // Append productId if editing an existing product
      formData.append("productId", product._id); 
  
      // Handle editing existing product
      const result = await editProductData(formData, token);
      if (result) {
        dispatch(setProduct(result));
        dispatch(setEditProduct(false));
        navigate("/");
      }
    } else {
      // Handle creating a new product
      const result = await createProductDetails(formData, token);
      if (result) {
        dispatch(setProduct(result));
        navigate("/publish-product");
      }
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-6 border shadow-sm rounded-lg max-w-3xl mx-auto"
    >
      <div className="flex flex-col">
        <label htmlFor="productTitle" className="text-sm font-medium text-gray-700">
          Product Name <sup className="text-red-600">*</sup>
        </label>
        <input
          type="text"
          id="productTitle"
          placeholder="Ex: Rose Water"
          {...register("productTitle", { required: true })}
          className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.productTitle && (
          <span className="text-sm text-red-600 mt-1">Product Title is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="productDesc" className="text-sm font-medium text-gray-700">
          Product Description <sup className="text-red-600">*</sup>
        </label>
        <textarea
          id="productDesc"
          placeholder="Enter About Product"
          {...register("productDesc", { required: true })}
          className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.productDesc && (
          <span className="text-sm text-red-600 mt-1">Product Description is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="productQuantity" className="text-sm font-medium text-gray-700">
          Product Quantity <sup className="text-red-600">*</sup>
        </label>
        <input
          id="productQuantity"
          placeholder="Ex: 1 ltr or 1 lt"
          {...register("productQuantity", { required: true })}
          className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        {errors.productQuantity && (
          <span className="text-sm text-red-600 mt-1">Product Quantity is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="productPrice" className="text-sm font-medium text-gray-700">
          Product Price <sup className="text-red-600">*</sup>
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-6 text-lg text-gray-500" />
          <input
            type="text"
            id="productPrice"
            placeholder="Enter Product Price"
            {...register("productPrice", { required: true })}
            className="p-3 pl-10 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {errors.productPrice && (
          <span className="text-sm text-red-600 mt-1">Product Price is required</span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="productCategory" className="text-sm font-medium text-gray-700">
          Product Category <sup className="text-red-600">*</sup>
        </label>
        <select
          {...register("productCategory", { required: true })}
          defaultValue=""
          id="productCategory"
          className="p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            categories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.productCategory && (
          <span className="text-sm text-red-600 mt-1">Product Category is required</span>
        )}
      </div>

      <Upload
        name="productThumbnail"
        label="Product Thumbnail"
        setValue={setValue}
        register={register}
        errors={errors}
      />

      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="py-3 mt-4 w-44 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:border-blue-500"
        >
          {editProduct ? "Update" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default ProductInformationForm;
