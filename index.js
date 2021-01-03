const express=require('express');
const path=require('path');
//for reading & writing into cookies (ie cookie section when you do ctrl shft I)
const cookieParser=require('cookie-parser');

//used for session cookie(takes cookie and encrypts it)
const session=require('express-session');
//we need to require both passport & passport-local
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//for storing cookie in db
const MongoStore=require('connect-mongo')(session);

//SASS required for writing CSS code neat & in efficent manner
//Files are compiled to CSS at run time however we change it precompile in production
const sassMiddleware =require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose.js');
// const { pass } = require('./config/mongoose.js');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
//make the upload path avialbale to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);



app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    //show eero if error in converting to tprefix
    debug:true,
    //i want every thing to be in multiple line thats why we use outputstyle extended
    outputStyle:'extended',
    prefix:'/css'
    }));

//style & scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));



//app.use ->using expression session(that helps in encrypting cookie)
//saveunitialized when user is not established no data is required to be stored in the cookie
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
//this flash message thing using sesssion cookie thats why we have placed it below

app.use(flash());

app.use(customMware.setFlash);
//here the my present ie root index file is requesting the main routes/index 
app.use('/',require('./routes/index.js'));
app.listen(8080,(err)=>{

    if(err)
    { 
        console.log("error in running up the server",err);
        return;
    }

    console.log("severs is up & running on port 8080");
});

