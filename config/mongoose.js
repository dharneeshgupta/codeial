const mongoose=require('mongoose');


// codeial_developemnt-> is a database
mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecing gto mongodb"));
db.once('open',()=>{
    console.log("connected to db::Mongodb");
});

module.exports=db;