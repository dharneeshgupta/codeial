const express=require('express');
// const { route } = require('.');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);

//use passport as a middleware to authentictae
router.post('/create-session', passport.authenticate('local',
{failureRedirect:'/users/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);
console.log("user loaded");
 

module.exports=router;