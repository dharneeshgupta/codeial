const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');

//used for session cookie(takes cookie and encrypts it)
const session=require('express-session');
//we need to require both passport & passport-local
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//for storing cookie in db
const MongoStore=require('connect-mongo')(session);

const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose.js');
// const { pass } = require('./config/mongoose.js');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

//style & scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));



//app.use ->using expression session(that helps in encrypting cookie)
//saveunitialized when user is not established not data is required to cookie
//simlarly idently established we dont require to resave

//mongo store is used to store cookie in db
app.use(session({
name:'codeial',
//todo change the secret before deployment in prod mode
secret:"blahsomething",
saveUninitialized:false,
resave:false,
cookie:{
   maxAge:(1000*60*100) 
}
,store:new MongoStore({
    mongooseConnection:db,
    autoRemove:'disabled'
},
(err)=>{
    console.log(err || "connect-mongo-db-setup-ok");
}
)
}));

//need to tell app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index.js'));
app.listen(8080,(err)=>{

    if(err)
    {
        console.log("error in running up the server",err);
        return;
    }

    console.log("severs is up & running on port 8080");
});

