const express=require('express');
const { route } = require('.');
const router=express.Router();

const userController=require('../controllers/user_controller');
router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
console.log("user loaded");
 

module.exports=router;