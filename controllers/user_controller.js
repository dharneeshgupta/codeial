const { user } = require('../config/mongoose');
const User=require('../models/user');

module.exports.profile=(req,res)=>{

    //res.end('<h1>User profile</h1>');
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile',{
            title:"profile",
            profile_user:user
        });
    });

    
}

module.exports.update=(req,res)=>{
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
            return res.redirect('back');
        });
    }
    else
    {
        return res.status(401).send('Unathorized');
    }

}

//render the sign in page
module.exports.signUp=(req,res)=>{

    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeila|Signup"
    });
}

//render the siign up page

module.exports.signIn=(req,res)=>{
if(req.isAuthenticated())
{
    return res.redirect('/users/profile');
}

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
});

}


//sign in & create session fo the user
module.exports.createSession=(req,res)=>{

    req.flash('success','Logged In Succefully');
    console.log("abe ye create session dekh ",req.params);
    return res.redirect('/');
}


module.exports.destroySession=(req,res)=>{

    req.logout();
    req.flash('success','You have logged out!');
    return res.redirect('/users/sign-in');
}


