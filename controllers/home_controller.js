module.exports.home= function(req,res){
    // return res.end('<h1>Express is up for codeal</h1>');
    // console.log(req.cookies);
    // res.cookie('user_id',245);
return   res.render('home',{
    title:"Home"
});
}