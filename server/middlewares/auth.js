const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req,res,next)=>{
    try{
        //extract token 
        const token = req.cookies.token || req.header("Authorization").replace("Bearer ","") || req.body.token;
        //if token is not present 
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        //verify token 
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode
        }
        catch(error){
            //verification issue 
            return res.status(401).json({
                success:false,
                message:'Token is Invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong in validating token',
        })
    }
}
 //isAdmin 
 exports.isAdmin = async (req,res,next)=>{
    try{
        if(req.user.accountType !== "admin"){
            return res.status(401).json({
                success:false,
                message:'This is portal for admin',
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified',
        });
    }
 }