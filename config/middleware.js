module.exports.setFlash=(req,res,next)=>{

    console.log("I am setflash middleware")
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}