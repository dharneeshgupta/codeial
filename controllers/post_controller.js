    const Post=require('../models/post');

module.exports.create=(req,res)=>{
    
    // console.log(req);
    console.log(req.user);
    // console.log(req.body);

    Post.create({
        content:req.body.content,
        user:req.user._id,
    
    },(err,post)=>{
        if(err)
        {
            console.log("erro in craeing  post");
            return;
        }
        return res.redirect('back');
    })
}