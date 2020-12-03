const express=require('express');
const path=require('path');
const app=express();


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

