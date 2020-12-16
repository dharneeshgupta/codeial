const express=require('express');
const router= express.Router();

const postsController=require('../controllers/post_controller');
const passport=require('passport');
const { route } = require('./users');

router.post('/create',passport.checkAuthentication,postsController.create);

module.exports=router;