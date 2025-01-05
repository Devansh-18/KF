import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import {authEndpoints} from "../apis"
import toast from "react-hot-toast";

const {
    VERIFY_EMAIL_API,SIGNUP_API,LOGIN_API
} = authEndpoints

export const sendOtp = async (email,navigate,dispatch)=>{
    dispatch(setLoading(true)); 
    let result = null;
    const toastId = toast.loading("Sending Otp");
    try{
        const response = await apiConnector("POST",VERIFY_EMAIL_API,{email});
        console.log("YE LO RESPONSE ->",response);
        if(!response.data.success){
            throw new Error("Error in sending email");
        }
        result = response.data.otpBody.otp;
        console.log(result);
        toast.success("OTP sent");
        navigate("/verify-email");
    }
    catch(error){
        console.log("ERROR IN VERIFY EMAIL ->", error.message);
        toast.error(error.message);
    }
    dispatch(setLoading(true));
    toast.dismiss(toastId);
}

export const verifyEmailAndSignup = async (firstName,lastName,email,password,confirmPassword,navigate,otp,dispatch)=>{
    dispatch(setLoading(true));
    const toastId = toast.loading("Verifying OTP...");
    let result = null;
    try{
        const response = await apiConnector("POST",SIGNUP_API,{
            email,password,confirmPassword,firstName,lastName,otp
        });
        console.log(response);
        if(!response.data.success){
            throw new Error("ERROR IN SIGNUP");
        }
        result = response;
        console.log(result);
        navigate("/login");
    }
    catch(error){
        console.log("ERROR IN SIGNUP -> ",error);
        toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
}

export const login = async (email,password,dispatch,navigate)=>{
    const toastId = toast.loading("Logging In...");
    dispatch(setLoading(true));
    try{
        const response = await apiConnector("POST",LOGIN_API,{email,password});
        if(!response.data.success){
            throw new Error("LOGIN FAILED");
        }
        console.log(response);
        toast.success("Logged In");
        dispatch(setToken(response.data.token));
        const user = response.data.user;
        dispatch(setUser(user));
        localStorage.setItem("token",JSON.stringify(response.data.token));
        localStorage.setItem("user",JSON.stringify(response.data.user));
        navigate("/");
    }
    catch(error){
        console.log("LOGIN FAILED -> ",error.message);
        toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
}

export const logout = async (dispatch,navigate)=>{
    const toastId = toast.loading("Logging Out...");
    dispatch(setLoading(true));
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.dismiss(toastId);
    toast.success("Logged Out Successfully");
    navigate("/");

}