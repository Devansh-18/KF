const Product = require("../models/Product");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type); //checks whether element type is present in array of supportedTypes 
}

exports.createProduct = async(req,res)=>{
    try{
        //fetch data
        const{productName,productDescription,price,category,quantity} = req.body;
        //get thumbnail 
        const thumbnail = req.files.thumbnail;
        //validation
        if(!productName||!productDescription||!price||!thumbnail||!category){
            return res.status(400).json({
                success:false,
                message:"Fill all course details",
            });
        }
        //admin data 
        const userId = req.user.id;
        if(!userId){
            return res.status(404).json({
                success:false,
                message:'Admin details not found',
            });
        }
        //checkgiven category
        const categoryDetails = Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'category details not found',
            });
        }
        //upload image to cloudinary 
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = thumbnail.name.split(".")[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File Format not supported',
            })
        }
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
        //create entry for new course in db
        const newProduct = await Product.create({
            productName: productName,
            productDescription: productDescription,
            price,
            quantity,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status:"Draft"
        })
        
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{product:newProduct._id}
            },
            {new:true},
        )


        return res.status(200).json({
            success:true,
            message:'Product Created Successfully',
            data:newProduct,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error while creating Product',
            error:error.message,
        });
    }
};

exports.editProduct = async(req,res)=>{
    try{
        const {productId} = req.body;
        const updates = req.body;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(400).json({
                success:false,
                message:'Product Not Found',
            })
        }
        if(req.files){
            console.log("Thumbnail Update");
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME,
            )
            product.thumbnail = thumbnailImage.secure_url
        }
        for (const key in updates){
            if(updates.hasOwnProperty(key)){
                
                    product[key] = updates[key]
                
            }
        }
        await product.save();
        const updatedProduct = await Product.findOne({_id:productId})
        .populate("category")
        .exec();
        return res.status(200).json({
            success:true,
            message:'Product edited Successfully',
            data:updatedProduct,
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:'Error in edit course',
            error:error.message,
        })
    }
}

//get all courses 
exports.getAllProducts = async (req,res)=>{
    try{
        const allProducts = await Product.find({},{productName:true,price:true,thumbnail:true,quantity:true});
        return res.status(200).json({
            success:true,
            message:'All products fetched Successfully',
            allCourses: allProducts,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch Products',
            error:error.message,
        })
    }
};

//get all course Details 
exports.getProductDetails = async (req,res)=>{
    try{
        //get id 
        const {productId} = req.body;
       if(!productId){
        return res.status(400).json({
            success:false,
            message:`Product Id mandatory`,
        })
       }

        const productDetails = await Product.find(
            {_id:productId,status:"Published"}
        )
        .populate("category")
        .exec();
        //validation 
        if(!productDetails){
            return res.status(403).json({
                success:false,
                message:`Couldn't find product with ${productId}`,
            })
        }
        //return res 
        return res.status(200).json({
            success:true,
            message:'Product Details fetched successfully',
            data:productDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}