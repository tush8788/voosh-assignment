const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
// set strictQuery to false means addition vaildation is off 
mongoose.set('strictQuery',false);
//mongodburl
mongoose.connect(process.env.MONGO_URL||'mongodb://localhost/voosh-assignment');
//get connection of mongodb
const db=mongoose.connection;
//if error in connect mongodb 
db.on('error',function(){
    console.log("Error in connect with DB");
})
//if connection successfull
db.once('open',function(){
    console.log("Successfully connected with DB");
})

module.exports=db;