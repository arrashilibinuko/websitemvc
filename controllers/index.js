
var async = require('async');

var index = require('../models/index');

var userdb = index.User;


exports.getusers = function(req,res) {
    userdb.findAll().then(users=> {
        console.log('success get list');
        res.render('sucess in getting list')
    })
}






exports.sample = (req,res,next) => {
    console.log("success")
    // res.json("success")
    res.render('index', {title: "Arrashi"});
    //res.render('view',data)
}