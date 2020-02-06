var express = require('express');
var path = require('path');
var favion = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var passport = require('./common/passport');
var session = require("express-session")

// var index = require('./routes/index')
// var login = require('./routes/login')
var router = require('./routes/router')

var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//place facion in /public

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport setup
app.use(passport.initialize());
app.use(passport.session());

app.use(session({secret: "keyboard", resave: true, saveUninitialized: true}));





// app.use('/', index);
// app.use('/', login)
app.use('/', router);
app.use(express.static('public'));




//catch 404 and pass it to error handler
app.use(function(req,res,next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err)
});

app.use(function(err,req,res,next) {
    //set locals, only providing error in developement
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render error ststus page
    res.status(err.status || 500);
    res.render('error');
});

if(!module.parent) {
    app.listen(config.port, function() {
        console.log(`app is listening at port ${config.port}`)
    })
}

module.exports = app;
