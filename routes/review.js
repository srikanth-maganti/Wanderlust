
const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js")

const reviews=require("../models/review.js");
const listing=require("../models/listing.js");

const {validatereview, isreviewauthor}=require("../middleware.js");

const {isloggedin}=require("../middleware.js");
const reviewcontroller=require("../controllers/reviews.js");




//creating revieews
router.post("/",isloggedin,validatereview,wrapasync(reviewcontroller.createreview));


//delete review
router.delete("/:reviewid",isloggedin,isreviewauthor,wrapasync(reviewcontroller.deletereview));

module.exports=router;

