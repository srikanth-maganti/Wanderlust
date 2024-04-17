const express=require('express');
const router=express.Router();
const User= require("../models/user.js");
const wrapasync = require('../utils/wrapasync.js');
const passport=require("passport");
const {saveredirecturl}=require("../middleware.js");
const usercontroller=require("../controllers/user.js");


router.route("/login")
    .get(usercontroller.renderloginform)
    .post(saveredirecturl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),usercontroller.login)
router.route("/signup")
    .get(usercontroller.rendersignupform)
    .post(wrapasync(usercontroller.signup))


router.get("/logout",usercontroller.logout);

module.exports=router;