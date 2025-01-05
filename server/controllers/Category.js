const Category = require("../models/Category");

//create category 
exports.createCategory = async (req,res)=>{
    try{
        //fetch data 
        const {name,description} = req.body;
        //validation 
        if(!name||!description){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        //create entry in db 
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        return res.status(200).json({
            success:true,
            message:'Category created Successfully',
            categoryDetails
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while creating category',
        });
    }
};

//get all category  
exports.showAllCategory = async(req,res)=>{
    try{
        const allCategory = await Category.find({}, {name:true, description:true,image:true});//saare tag de do without any specific logic but ensure that something is written in tag and description 
        return res.status(200).json({
            success:true,
            message:'All category are fetched',
            allCategory,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error while getting all Category',
        });
    }
}

//get category page details 

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
        console.log(categoryId);
        //get courses for specified category 
        const selectedCategory = await Category.findById(categoryId)
                                               .populate("product")
                                               .exec();
        //validation 
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:'Data not found',
            });
        }

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
            }
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}