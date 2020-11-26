const express=require('express');

const app=express();


app.use('/',require('./routes/index.js'));
app.listen(8080,(err)=>{

    if(err)
    {
        console.log("error in running up the server",err);
        return;
    }

    console.log("severs is up & running on port 8080");
});

