

const User=require("../models/user.js");

module.exports.rendersignupform=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try
    {
        let {username,password,email}=req.body;
        let newuser=new User({
            email:email,
            username:username,
        });
    
        let registerduser=await User.register(newuser,password);
        console.log(registerduser);
        req.login(registerduser,(err)=>{
            if(err)
            {
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listing");
        })
       
    }
    catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
}
module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=(req,res)=>{
    req.flash("success","welcome back to wanderlust");
    let redirecturl=res.locals.redirecturl|| "/listing";
    res.redirect(redirecturl);
};
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            req.flash("error","failed to log out");
            return next(err);
        }
        req.flash("success","you logged out");
        res.redirect("/listing");

    })
};