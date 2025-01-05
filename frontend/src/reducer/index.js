import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import productReducer from '../slices/productSlice';

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    product:productReducer,
});

export default rootReducer;