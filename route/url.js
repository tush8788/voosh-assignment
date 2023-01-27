const express =require('express');
const router=express.Router();
const urlController=require('../controller/url_controller');

//sign up
router.post('/add-user',urlController.signUp);

//sign in
router.post('/login-user',urlController.signIn)

module.exports=router;