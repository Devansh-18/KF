import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { categoryEndpoints, productEndpoints } from "../apis";
import { setLoading } from "../../slices/profileSlice";

const {
    CREATE_CATEGORY_API,
    CATEGORIES_API,
    GET_CATEGORY_DETAILS_API,
} = categoryEndpoints;
const {
    GET_ALL_PRODUCT_API,
    PRODUCT_DETAILS_API,
    CREATE_PRODUCT_API,
    EDIT_PRODUCT_API,
} = productEndpoints;


//category

export const createNewCategory = async (title,desc,token,navigate)=>{
    const toastId = toast.loading("Creating...");

    try{
        const response = await apiConnector("POST",CREATE_CATEGORY_API,{name:title,description:desc},{Authorization:`Bearer ${token}`})
        if(!response?.data?.success){
            throw new Error("Could not create category");
        }
        console.log("Category created -> ",response);
        toast.success("Category Created");
        navigate("/");
    }
    catch(error){
        console.log("Error While creating category -> ", error.message);
    }
    
    toast.dismiss(toastId);
    return;
}

export const fetchCategories = async ()=>{
    let result = [];

    try{
        const response = await apiConnector("GET",CATEGORIES_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch categories");
        }
        result = response?.data?.allCategory;
    }
    catch(error){
        console.log("Error in fetching categories",error);
    }
    
    return result;
}

export const getCategoryPageDetails = async (categoryId)=>{
    const toastId = toast.loading("Loading...");

    console.log(categoryId);
    let result = [];
    try{
        const response = await apiConnector("POST",GET_CATEGORY_DETAILS_API,{categoryId:categoryId,});
        if(!response?.data?.success){
            throw new Error("Could not fetch products");
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("Error while fetching all products", error.message);
        toast.error(error.message);
    }
    
    toast.dismiss(toastId);
    return result;
}
//PRODUCTS 

export const getAllProducts = async ()=>{
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET",GET_ALL_PRODUCT_API);
        if(!response?.data?.success){
            throw new Error("Could not fetch all products");
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("Error while fetching all products", error.message);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchProductDetails = async (productId) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        if (!productId) {
            throw new Error("Product ID is required.");
        }

        console.log("Product ID ->", productId);

        const response = await apiConnector("POST", PRODUCT_DETAILS_API, { productId });
        console.log("Product Details Response ->", response);

        if (!response.data.success) {
            throw new Error(response.data.message || "Could not fetch product details");
        }

        result = response.data.data;
    } catch (error) {
        console.error("Error while fetching product details", error);
        toast.error(error.message || "An error occurred");
    }

    toast.dismiss(toastId);
    return result;
};



export const createProductDetails = async (data,token)=>{
    const toastId = toast.loading("Creating...");
    let result = null;
    try{
        const response = await apiConnector("POST",CREATE_PRODUCT_API,
            data,
            {
                Authorization:`Bearer ${token}`,
                "Content-Type" : "multipart/form-data",
            })
        if(!response?.data?.success){
            throw new Error("Could not create product");
        }
        console.log("Product Details -> ",response);
        toast.success("Product Details Added");
        result=response?.data?.data;
    }
    catch(error){
        console.log("Error While creating product -> ", error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const editProductData = async (data,token)=>{
    const toastId = toast.loading("Editing...");
    let result = null;
    try{
        const response = await apiConnector("POST",EDIT_PRODUCT_API,data,{
            Authorization:`Bearer ${token}`,
        })
        if(!response?.data?.success){
            throw new Error("PRODUCT EDITION FAILED -> ",response)
        }
        console.log("Edited Product -> ",response);
        result = response?.data?.data;
        toast.success("Product Edited");

    }
    catch(error){
        console.log("PRODUCT NOT EDITTED -> ", error);
        toast.error("Error in editing product");
    }
    toast.dismiss(toastId);
    return result;
}