const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        trim:true,
    },
    productDescription:{
        type:String,
        trim:true,
        default:"A fabulous KF's product",
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    instructions:{
        type:[String]//array of string
    },
    status:{
        type:String,
        enum:["Published","Draft"],
    }
});

module.exports = mongoose.model("Product", productSchema);