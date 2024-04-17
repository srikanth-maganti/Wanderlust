const listing=require("../models/listing.js");
const reviews=require("../models/review.js");
module.exports.createreview=async(req,res)=>{
    let list=await listing.findById(req.params.id);
    let review1=new reviews(req.body.review);
    review1.author=req.user._id;
    list.reviews.push(review1);

    await review1.save();
    await list.save();
    req.flash("success","review created");

   res.redirect(`/listing/${list._id}`)
};


module.exports.deletereview=async (req,res)=>{
    console.log("haha");
    let {id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await reviews.findByIdAndDelete(reviewid);
    req.flash("success","review deleted");
    res.redirect(`/listing/${id}`);
};