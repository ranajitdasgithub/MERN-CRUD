const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const {userModel}=require("../models/user.model")

const userController=Router()


userController.post("/signup",(req,res)=>{
    const {email,password,name}=req.body;
    console.log(email,password)
    bcrypt.hash(password,5, async function(err,hash){
        if(err){
            res.send("Something went wrong, please try again later")
        }
        const user=new userModel({
            email,
            password:hash,
            name
        })
        try{
            await user.save()
            res.json({"msg":"Signup Successfully"})
        }
        catch(err){
            console.log(err)
            res.send("Something went wrong, try later")
        }
    })
})

userController.post("/login",async (req,res)=>{
    const {email,password}= req.body;
    const user = await userModel.findOne({email})
    //console.log(user) //--->total obj of particular user
    const hash = user.password
    bcrypt.compare(password,hash,function(err,result){
        if(err){
            res.send("Something went wrond, try later")
        }
        if(result){
            //this _id send as decoded for check specific user
            const token=jwt.sign({userId : user._id},process.env.SECRET_KEY);
            res.send({msg:"Login successful",token})
        }
        else{
            res.send("Invalid credential, plz signup if you haven't")
        }
    })
})

module.exports={
    userController
}