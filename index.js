const express=require('express');
const bodyParser=require('body-parser');
const port=process.env.PORT || 8000;

const app=express();

app.set('view engine','ejs');
app.set('view','./view');

app.use(bodyParser.urlencoded({extended:false}));

//handing urls
app.use('/',require('./route/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up on port :: ",port);
})