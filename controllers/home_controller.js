const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= async function(req,res){
    // return res.end('<h1>Express is up for codeal</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id',245);

    // Post.find({},(err,posts)=>{
    //     console.log(posts);
    //     return   res.render('home',{
    //         title:"Home",
    //         posts:posts
    //     });
    // });

    // Post.find({}).populate('user').exec((err,posts)=>{
    //     // console.log(posts);
    //     return   res.render('home',{
    //         title:"Home",
    //         posts: posts
    //     });
    // });

    //the code which is right now is cluttered 
    //now there are 3 ways of doing this :
    // 1- brute force
    // 2 - Promises
    // 3- async + await
    try{
        let posts=await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
            
        });
    
        let users=await  User.find({});
    
        return   res.render('home',{
            title:"Home",
            posts: posts,
            all_users:users
        });
      
    }
    catch(err){
        console.log("Error:",err);
    }
      
}