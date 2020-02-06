module.exports = function(req,res,next) {
    console.log(req.session.passport)
    if (req.session && req.session.passport && req.session.passport.user) {
        return next();
    } else{
        return res.redirect("/login")
    }
}