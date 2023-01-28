const passport =require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const ExtractKJWT=require('passport-jwt').ExtractJwt;
const UserDB=require('../models/user');
const dotenv=require('dotenv').config();

// set up options 
let opts={
    // extract jwt token into user
    jwtFromRequest:ExtractKJWT.fromAuthHeaderAsBearerToken(),
    // secretkey 
    secretOrKey:process.env.secrectKey
}
// authentication done here
passport.use(new jwtStrategy(opts,async function(jwt_payload,done){
    try{
        //finding user 
        let user=await UserDB.findById(jwt_payload._id);
        if(!user){
            return done(null,false);
        }
        else{
            return done(null,user);
        }

    }   
    catch(err){
        console.log(err);
        return done(err);
    } 
}))

module.exports=passport;