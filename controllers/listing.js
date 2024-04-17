const listing=require("../models/listing.js");
module.exports.index=async (req,res)=>{
    
     let {category,title}=req.query;
        if(category)
        {   
            let allistings=await listing.find({category:category});
            res.render("./listings/index.ejs",{allistings});
        }
        else if(title)
        {   
            let allistings=await listing.find({title:title});
            res.render("./listings/index.ejs",{allistings});
        }
        else
        {
            let allistings=await listing.find({});
            res.render("./listings/index.ejs",{allistings});
        }

        
    

};

module.exports.rendernewform=(req,res)=>{
    
    res.render("./listings/new.ejs");
};

module.exports.createlisting=async (req,res,next)=>{
    // let {title,location,description,image,price,country}=req.body;
    
    
        // let result=listingschema.validate(req.body);
        // console.log(result);
        // if(result.error)
        // {
        //     throw new ExpressError(400,result.error);
        // }

        // if(!req.body.list)
        // {
        //     throw new ExpressError(400,"bad re quest");
        // }
        let url=req.file.path;
        let filename=req.file.filename;
        console.log(url+".."+filename);
        let ls=new listing(req.body.list);
        ls.owner=req.user._id;
        ls.image={url,filename};
        // if(!ls.title){
        //     throw new ExpressError(400,"bad re quest");
        // }
        await ls.save();
        req.flash("success","new listing created successfully");
        res.redirect('/listing');

   
   
};

module.exports.showlisting=async (req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id).populate({path:"reviews",populate: {path:"author"}}).populate("owner");
    if(!list)
    {
        req.flash("error","listed u requested for not existed");
        res.redirect("/listing");
    }
    res.render("./listings/show.ejs",{list});


};

module.exports.rendereditform=async (req,res)=>{
    
    let {id}=req.params;
    let list=await listing.findById(id);
    if(!list)
    {
        req.flash("error","listing not existed");
        res.redirect("/listing");
    }    
    let originalimageurl=list.image.url;
    originalimageurl=originalimageurl.replace("/upload","/upload/h_300,w_250");
    console.log(originalimageurl);
    res.render("./listings/edit.ejs",{list,originalimageurl});
};

module.exports.updatelisting=async (req,res)=>{
    let {id}=req.params;
    
  let ls= await listing.findByIdAndUpdate(id,{...req.body.list});
  if(typeof req.file!="undefined")
  {
    let url=req.file.path;
    let filename=req.file.filename;
    ls.image={url,filename};
    await ls.save();
  }
   req.flash("success","updated successfully");
    res.redirect(`/listing/${id}`);
    
};

module.exports.deletelisting=async(req,res)=>{
    let {id}=req.params;
    let delted=await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted");
    res.redirect("/listing");
};