import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    step:1,
    product:null,
    editProduct:false,
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProduct(state,action){
            state.product = action.payload;
        },
        setEditProduct(state,action){
            state.editProduct = action.payload;
        },
        resetProductState(state,action){
            state.product = null;
            state.editProduct = false;
        }
    }
})

export const {
    setProduct,setEditProduct,resetProductState,
} = productSlice.actions;

export default productSlice.reducer;