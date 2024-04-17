const mongoose=require("mongoose");

const reviewschema=new mongoose.Schema(
    {
        comment:String,
        rating:{
            type:Number,
            min:1,
            max:5,
        },
        created_at:{
            type:Date,
            default:Date.now(),
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }

    }
)

const reviews=mongoose.model("reviews",reviewschema);

module.exports=reviews;