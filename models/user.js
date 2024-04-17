const mongoose=require("mongoose");
const passportlocal=require("passport-local-mongoose");


let userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
})

userschema.plugin(passportlocal);

module.exports=mongoose.model("User",userschema);

