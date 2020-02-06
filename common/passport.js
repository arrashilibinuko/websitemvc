var passport = require("passport");
var LocalStratergy = require("passport-local").Strategy;

var users = require('../models/users')

passport.use(new LocalStratergy(
    {
        usernameField: "username"
    },
    function(username,password,done) {
        console.log(username)
        var dbUsers = {
            username: "arrashi",
            password: "123"
        }
        users.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            console.log(user)
            if (!user) {
                console.log("this is user: " + user)
                return done(null,false, {
                    message: "incorrect username"
                });
            } else if (!user.isvalidPassword(password)) {
                return done(null,false, {
                    message: "incorrect password"
                });
            } 
            return done(null,user);
        });
        //     if(!users) {
        //         return done(null,false, {
        //             message: "incorrect email."
        //         });
        //     } else if (!users.validPassword(password)) {
        //         return done(null,false, {
        //             message: "incorrect password"
        //         });
        //     }
        //     return done(null, users)
        // });
        // }
    }
));

passport.serializeUser(function(user,cb) {
    cb(null,user)
});

passport.deserializeUser(function(obj,cb) {
    cb(null,obj)
});

module.exports = passport;

