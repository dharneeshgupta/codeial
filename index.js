const express=require('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose.js');

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

app.use('/',require('./routes/index.js'));
app.listen(8080,(err)=>{

    if(err)
    {
        console.log("error in running up the server",err);
        return;
    }

    console.log("severs is up & running on port 8080");
});

