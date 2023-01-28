const express=require('express');
const router=express.Router();
// import home controller
const homeController=require('../controller/home_controller.js');
// handle home page req
router.get('/',homeController.home);
//sending req to another file 
router.use('/url',require('./url'));

module.exports=router;