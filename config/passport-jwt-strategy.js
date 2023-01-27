const passport =require('passport');
const jwtStrategy=require('passport-jwt').Strategy;
const ExtractKJWT=require('passport-jwt').ExtractJwt;
const UserDB=require('../models/user');

let opts={
    jwtFromRequest:ExtractKJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"secretKey"
}

passport.use(new jwtStrategy(opts,async function(jwt_payload,done){
    try{
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