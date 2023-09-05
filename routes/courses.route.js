const express=require("express");
const courseModel = require("../models/course.model");
const auth = require("../middlewares/auth.middleware");

const courseRouter=express.Router()

courseRouter.get("/",async(req,res)=>{
    try {
        const course=await courseModel.find();
        res.json({course})

    } catch (error) {
        res.json({error}).status(500)
    }
})
courseRouter.get("/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const course=await courseModel.find({_id:id});
        res.json({course})

    } catch (error) {
        res.json({error}).status(500)
    }
})

courseRouter.use(auth)

courseRouter.post("/add",async(req,res)=>{
    try {
        const course=new courseModel(req.body)
        await course.save();
        res.json({msg:'Courses Added Successfully'})
    } catch (error) {
        res.json({error}).status(500)
    }
})


module.exports=courseRouter