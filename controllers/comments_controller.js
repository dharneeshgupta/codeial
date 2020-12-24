const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create= async (req,res)=>{

    // console.log("*****comments-controller******");
    // console.log("*****req.user******");

    // console.log(req.user);
    // console.log("*****req.body*****");
    // console.log(req.body);

    try {
        let post=await Post.findById(req.body.post);
        // if(err)
         // return res.redirect('back');
 
             if(post)
             {
                 let comment=await Comment.create({
                     content:req.body.content,
                     post:req.body.post,
                     user:req.user._id
                 });
                     // if(err)
                     // {
                     //     console.log("error in creating comment");
                     //     return;
                     // }
                     post.comments.push(comment);
                     post.save();
                     res.redirect('/');
                 
                
             } 
    } catch (error) {
     console.log("error",error);   
    }

}

module.exports.destroy=async (req,res)=>{

    let comment=await Comment.findById(req.params.id);
        try{
            
    if(comment.user==req.user.id)
    {
        //before deleitng the comment we need to have post id
        //aslo from there also comment will get deleted

        let postId=comment.post;
        comment.remove();
        let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            return res.redirect('back');
       

    }
    else
    {
        return res.redirect('back');
    }
        }catch(err)
        {
            console.log("Error ",err);
        }
   

}