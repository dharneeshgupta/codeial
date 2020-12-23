const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= function(req,res){
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


    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
        
    })
    .exec((err,posts)=>{
        User.find({},(err,users)=>{
            console.log(posts);
        return   res.render('home',{
            title:"Home",
            posts: posts,
            all_users:users
        });
        })
        
    });
    
}