const express =require('express');
const router=express.Router();
const urlController=require('../controller/url_controller');
const passport=require('passport');

//sign up
router.post('/add-user',urlController.signUp);

//sign in
router.post('/login-user',urlController.signIn)

//add order
router.post('/add-order',passport.authenticate('jwt',{session:false}),urlController.addOrder);

//all orders
router.get('/get-order/:id',passport.authenticate('jwt',{session:false}),urlController.allOrder);
module.exports=router;