    const Post=require('../models/post');
    const Comment=require('../models/comment');
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

module.exports.destroy=(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        //.id means convertinf the object id into string
        if(post.user== req.user.id)
        {
            post.remove();
            Comment.deleteMany({post:req.params.id},(err)=>{
                return res.redirect('back');
            });
        }

        else
        return res.redirect('back');
    });
}