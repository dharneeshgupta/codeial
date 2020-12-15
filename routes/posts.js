const express=require('express');
const router= express.Router();

const postsController=require('../controllers/post_controller');
const { route } = require('./users');

router.post('/create',postsController.create);

module.exports=router;