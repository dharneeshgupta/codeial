const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user.js');
// const { pass } = require('./mongoose');
//authentication using password.
passport.use(new LocalStrategy({
    usernameField:'email'
},
(email,password,done)=>{
//find a user & establish the identity
User.findOne({email:email},(err,user)=>{
    if(err)
    {
        console.log("erro in finding user->passport");
        return done(err);
    }
    if(!user||user.password!=password)
    {
        console.log("Invalid username password");
        return done(null,false);
    }
    else
    {
        return done(null,user);
    }
    

});
}
));


//serialisation the user to decide which key is to be kept in the cookie
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//deserializig the user from the key in cookies
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err)
        {
         console.log("erro in finding user->passport");
        return done(err);
        }
        
        return done(null,user);
    });
});



//check if user is authneticated
passport.checkAuthentication=(req,res,next)=>{
    
    // if user is signed in then pass on the request to next function(controller action)
    if(req.isAuthenticated())
    {
        return next();   
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated())
    {   //req.user contains the current sign in user from session cookie and we are just sending it to the locals for the views
        res.locals.user=req.user;
    } 
    next();

}



module.exports=passport;


