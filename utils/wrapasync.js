function wrapasync(fn)
{
    return function(req,res,next)
    {
        fn(req,res,next).catch((err)=>next(err));
    }
}

module.exports=wrapasync;