import {REACT_APP_BASE_URL} from "../baseUrl"
const BASE_URL = REACT_APP_BASE_URL;

//AUTH ENDPOINTS
export const authEndpoints = {
    VERIFY_EMAIL_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}


export const categoryEndpoints = {
    CATEGORIES_API:BASE_URL + "/product/showAllCategory",
    CREATE_CATEGORY_API:BASE_URL + "/product/createCategory",
    GET_CATEGORY_DETAILS_API:BASE_URL + "/product/getCategoryPageDetails"
}

//COURSE ENDPOINTS 
export const productEndpoints = {
    GET_ALL_PRODUCT_API: BASE_URL + "/product/getAllProducts",
    PRODUCT_DETAILS_API : BASE_URL + "/product/getProductDetails",
    EDIT_PRODUCT_API: BASE_URL + "/product/editProduct",
    CREATE_PRODUCT_API: BASE_URL + "/product/createProduct",
    EDIT_PRODUCT_API : BASE_URL + "/product/editProduct",
}

export const contactusEndpoint ={
    CONTACT_US_API: BASE_URL + "/reach/contact",
}