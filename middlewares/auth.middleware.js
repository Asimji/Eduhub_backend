const blacklist = require("../blacklist")
const jwt=require("jsonwebtoken")

const auth=async (req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]  
    if(token){
        try {
         if(blacklist.includes(token)){
            res.json({msg:"Unauthorised"}).status(400)
         }
         else{
            var decoded = jwt.verify(token, 'eduhub');
            if(decoded){
            //    req.body.userName=decoded.name
            //    req.body.userId=decoded._id
               next()
            }
            else{
                res.json({msg:"Token not matched"}).status(400)
            }
         }
        
        } catch (error) {
         res.json({error}).status(500)
        }
    }
    else{
        res.json({msg:"Unauthorised"}).status(400)
    }
   
}
module.exports=auth