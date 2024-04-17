const ExpressError=require("./utils/ExpressError.js");
const {listingschema}=require("./schema.js");
const listing=require("./models/listing.js");
const reviews=require("./models/review.js");

const {reviewsschema}=require("./schema2.js");
 module.exports.isloggedin=(req,res,next)=>{
   
    if(!req.isAuthenticated())
    {   req.session.redirecturl=req.originalUrl;
        req.flash("error","you must looged in ");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveredirecturl=(req,res,next)=>{
    if(req.session.redirecturl)
    {
        res.locals.redirecturl=req.session.redirecturl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing1=await listing.findById(id);
    
    
    if(! res.locals.curruser._id.equals(listing1.owner._id))
    {
        req.flash("error","your not owner of this lising");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateschema=(req,res,next)=>{
    
    let {error}=listingschema.validate(req.body);
    
    if(error)
    {   
        let errs=error.details.map((er)=>er.message).join(",");
        throw new ExpressError(400,errs);
    }
    else
    {   
        next();
    }
}

module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewsschema.validate(req.body);
    if(error)
    {

        let errs=error.details.map((er)=>er.message).join(",");
        throw new ExpressError(400,errs);
    }
    else
    {
        next();
    }
}


module.exports.isreviewauthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review1=await reviews.findById(reviewid);
    
    
    if(! res.locals.curruser._id.equals(review1.author._id))
    {
        req.flash("error","your not author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}