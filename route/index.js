const express=require('express');
const router=express.Router();
const homeController=require('../controller/home_controller.js');

router.get('/',homeController.home);

router.use('/url',require('./url'));

module.exports=router;