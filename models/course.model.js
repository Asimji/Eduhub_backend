const mongoose=require("mongoose");

const couresSchema=mongoose.Schema({
    title:String,
    description:String,
    instructor:String,
    subscriber:Number,
    rating:Number
},{
    versionKey:false
})

const courseModel=mongoose.model("courses",couresSchema)

module.exports=courseModel
