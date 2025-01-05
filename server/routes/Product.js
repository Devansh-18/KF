const express = require('express');
const { createProduct, getProductDetails, getAllProducts, editProduct } = require('../controllers/Product');
const { createCategory, showAllCategory, categoryPageDetails } = require('../controllers/Category');
const { auth, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.post("/createProduct",auth,isAdmin,createProduct);
router.post("/editProduct",auth,isAdmin,editProduct);
router.get("/getAllProducts",getAllProducts);
router.post("/getProductDetails",getProductDetails);

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategory",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetails);


module.exports = router;