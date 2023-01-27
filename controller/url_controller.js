const UserDB=require('../models/user');
const OrderDB=require('../models/orders');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();

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
        return res.status(500).json({
            message:"Internal Server Error"
        })
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
                token:jwt.sign(user.toJSON(),process.env.secrectKey,{expiresIn:"100000"})
            }
        })
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

//add order
module.exports.addOrder=async function(req,res){
    // console.log(req.body," ",req.user);
    try{
        //check sign in user or sendig req user is same or not
        if(req.body.phone == req.user.phone){
            let newOrder=await OrderDB.create({user:req.user._id, orderTotal:req.body.total, phone:req.body.phone});

            return res.status(200).json({
                message:"Successfully created order",
                data:{
                    order:newOrder
                }
            })
        }
        else{
            return res.status(422).json({
                message:"Login User or sinding req user not match"
            })
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}

//get all user orders list
module.exports.allOrder=async function(req,res){
    try{
        if(req.params.id==req.user._id){
            let userOrders=await OrderDB.find({user:req.params.id});
            return res.status(200).json({
                message:"done",
                data:{
                    allorders:userOrders
                }
            })
        }
        else{
            return res.status(409).json({
                message:"Invaild user id"
            })
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}