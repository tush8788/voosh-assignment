const express=require('express');
const bodyParser=require('body-parser');
const db=require('./config/mongoose');
const passport=require('./config/passport-jwt-strategy');
const dotenv=require('dotenv').config();
const port=process.env.PORT || 8000;

const app=express();
//set up view engine and view folder
app.set('view engine','ejs');
app.set('views','./view');

//set up middlewares 
//setup static folder
app.use(express.static('./assets'));

//its use for convert form data into json
app.use(bodyParser.urlencoded({extended:false}));

//handing urls
app.use('/',require('./route/index.js'));

// listen 
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port :: ",port);
})