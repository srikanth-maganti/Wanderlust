const mongoose=require("mongoose");
const reviews=require("./review.js");

let listingschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        // type:String,
        // default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fnature&psig=AOvVaw11gcjyN_1yBq10quXFsqrh&ust=1709530031160000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCk7Pat14QDFQAAAAAdAAAAABAE",
        // set:(v)=>v===""?"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fnature&psig=AOvVaw11gcjyN_1yBq10quXFsqrh&ust=1709530031160000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCk7Pat14QDFQAAAAAdAAAAABAE":v,

        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,

    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"reviews",
        }
    ],
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:String,
        enum:["Rooms","Mountains","Pools","Farms","Boats","Castles","Doms","Arctic"],
    }
});


listingschema.post("findOneAndDelete",async (list)=>{
    if(list)
    {   console.log("reviws also delteed")
        await reviews.deleteMany({_id:{$in : list.reviews}});
    }
    
})
let listing=mongoose.model("listing",listingschema);

//model and schema can be created without creating connection
//actual data can be inserted after creating a connection

module.exports=listing;
//In JavaScript, when you use require to include a module or file in another file (commonly used in environments like Node.js), the typical behavior is that the required file is executed at the point of the require statement. The code in the required file is run, and any exported values or functionality becomes available to the file that required it.