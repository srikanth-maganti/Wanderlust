const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");


main().then((res)=>{
    console.log("connected");
})
.catch((err)=>{
    console.log("error");
})
async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

let insertdb=async ()=>{
  await listing.deleteMany({});
  initdata.data=initdata.data.map((obj)=>({...obj,owner:"66061e39401e16f62ea476ef"}));
 await listing.insertMany(initdata.data);
 
};


insertdb().then((res)=>{
    console.log("inserteed  ");

})
.catch((Err)=>{
    console.log(Err);
})


