const express=require('express');
const router= express.Router();

const commentsController=require('../controllers/comments_controller');
const passport=require('passport');
const { route } = require('./users');

router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);
module.exports=router;