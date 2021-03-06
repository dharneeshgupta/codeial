const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SabhiUser'
    },
    comments:[{
        type:mongoose.Schema.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;
