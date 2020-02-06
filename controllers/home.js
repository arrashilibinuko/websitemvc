
var async = require('async');

var index = require('../models/index')

var userdb = index.User;


//get home
exports.sample = (req,res,next) => {
    console.log("success")
    console.log(req.session);
    // console.log(req.session.passport.username);
    // res.json("success")
    res.render('mobriseWebCarousell/index', 
    {
        name: 
        {
        title: "hello me",
        title2: "bye"
    }
});
    //res.render('view',data)
}