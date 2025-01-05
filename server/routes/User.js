const express = require("express");
const router = express.Router();

const {login, signUp,sendOTP,changePassword} = require("../controllers/Auth");
const{auth} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signUp", signUp);

router.post("/sendOTP",sendOTP);//auth dena hai ki nhi yaha *********
router.post("/changePassword",auth,changePassword);


module.exports = router;