const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create= (req,res)=>{

    console.log("*****comments-controller******");
    console.log("*****req.user******");

    console.log(req.user);
    console.log("*****req.body*****");
    console.log(req.body);

    Post.findById(req.body.post,(err,post)=>{
        // if(err)
        // return res.redirect('back');

            if(post)
            {
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                },(err,comment)=>{
                    // if(err)
                    // {
                    //     console.log("error in creating comment");
                    //     return;
                    // }
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                });
               
            }


    });

}

module.exports.destroy=(req,res)=>{

    Comment.findById(req.params.id,(err,comment)=>{
        if(comment.user==req.user.id)
        {
            //before deleitng the comment we need to have post id
            //aslo from there also comment will get deleted

            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},(err,post)=>{
                return res.redirect('back');
            });

        }
        else
        {
            return res.redirect('back');
        }
    });

}