const User=require('../models/user');

module.exports.profile=(req,res)=>{

    //res.end('<h1>User profile</h1>');
    return res.render('user_profile',{
        title:"profile"
    });
}

//render the sign in page
module.exports.signUp=(req,res)=>{
    return res.render('user_sign_up',{
        title:"Codeila|Signup"
    });
}

//render the siign up page

module.exports.signIn=(req,res)=>{
    return res.render('user_sign_in',{
        title:"Codeila|SignIn"
    });
}

//get the sign up data

module.exports.create=(req,res)=>{
    //todo
console.log(req.body);
if(req.body.password!=req.body.confirm_password)
{
    return res.redirect('back');
}

User.findOne({email:req.body.email},(err,user)=>{
    if(err){console.log("err in finding the user"); return;}

    //agar user ab tak nahi hai db main
    if(!user){
        User.create(req.body,(err,user)=>{
           
            if(err){console.log("error in creating user while signing up"); return;}
            return res.redirect('/users/sign-in');
        });
    }
    else{
        return res.redirect('back');
    }
})





}


//sign in & create session fo the user
module.exports.createSession=(req,res)=>{
    //todo later
}



