const UserDB=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//sign up
module.exports.signUp=async function(req,res){
    // console.log(req.body);
    try{

        let user=await UserDB.findOne({phone:req.body.phone});
        if(!user){
            //incripting password using bcript
            req.body.password=await bcrypt.hash(req.body.password,10);
            // console.log(req.body);
            const NewUser=await UserDB.create(req.body);
            return res.status(200).json({
                message:"User Created Successfully",
                user:NewUser
            });

        }
        else{
            return res.status(409).json({
                message:"User already exist"
            })
        }
    }
    catch(err){
        console.log(err);
        return;
    }
        
}

//sign in
module.exports.signIn= async function(req,res){
    try{
        const user=await UserDB.findOne({phone:req.body.phone});
        if(!user || !await bcrypt.compare(req.body.password, user.password)){
            return res.status(403).json({
                message:"Invaild Phone Number or Password"
            });
        }

        return res.status(200).json({
            message:"Sign in Successfully, keep safe your token",
            data:{
                token:jwt.sign(user.toJSON(),"secretKey",{expiresIn:"100000"})
            }
        })
        
    }
    catch(err){
        console.log(err);
        return;
    }
}

//add order
module.exports.addOrder=async function(req,res){
    console.log(req.body," ",req.user);
    
}