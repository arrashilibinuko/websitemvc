
var async = require('async');

var index = require('../models/index');

var userdb = index.User;






//view page
exports.sample = (req,res,next) => {
    console.log("success login page")
    // res.json("success")
    res.render('login');
    //res.render('view',data)
}

//getpage
exports.auth = (req,res,next) => {
    console.log("authenticate page")
    console.log(req.body.length)
    if (req.body.length == 0) {
        res.render('login')
    } else {
        res.redirect('/home')
    }
}