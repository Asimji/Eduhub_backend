const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken')
const userModel = require("../models/user.model");
const blacklist = require("../blacklist");

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,role,email,password}=req.body;
    const user=await userModel.findOne({email});
    if(user){
        res.json({msg:`${user.name} already exist`}).status(400)
    }
    else{
        bcrypt.hash(password, 2,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                res.json({msg:err}).status(400)
            }
            else{
                const user=new userModel({name,role,email,password:hash})
                await user.save()
                res.json({msg:`${name} is Successfully registered`})
            }
        })
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                // result == true
                if(result){
                    var token = jwt.sign({ ...user }, 'eduhub');
                    res.json({msg:`${user.name} Successfully Login`,token})
                }
                else{
                  res.json({msg:`user not exist`}).status(400)
                }
            })
        }
    } catch (error) {
        res.json({error}).status(500)
    } 

})

userRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
 try {
    if(token){
        if(blacklist.includes(token)){
            res.json({msg:"Already Logout"}).status(400)
        }
        else{
             blacklist.push(token);
             res.json({msg:"Logout Successfully"})
        }
    }
 } catch (error) {
    res.json({error}).status(500)
 }
})

module.exports=userRouter