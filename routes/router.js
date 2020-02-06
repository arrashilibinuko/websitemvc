var express = require('express');
var router = express.Router();

//list of all grp of action in controllers
var index = require('../controllers/index');
var login = require('../controllers/login');
var home = require('../controllers/home');
var useritems = require('../controllers/useritems')

var passport = require("../common/passport");



var users = require('../models/users')

router.use(express.urlencoded());




//index page
router.get('/', index.sample)



//login page
router.get('/login', login.sample);
router.post('/login', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    // failureFlash: true

}));



//home page
router.get('/home', home.sample);



var isAuthenticated = require('../common/isAuthenticated');


//usersitem
var items = require('../models/items')

router.get('/myItem',isAuthenticated, function(req,res) {

    items.findAll({
        where: {
            item_ownerid: req.session.passport.user.id
        }
    }).then(result => {
        console.log(result)
        res.render("mobriseWebCarousell/useritem", { data: result, message: ""})
    })
})


//additem page
router.get('/add',isAuthenticated, function(req,res) {
    res.render('mobriseWebCarousell/additem');
});
router.post('/add',isAuthenticated, function(req,res) {
    console.log(req.body)
    var name = req.body.item_name;
    var pic = req.body.item_pic;
    var price = req.body.price;
    var category = req.body.category;
    var description = req.body.description
    var sessionID = req.session.passport.user.id
    items.create({
        item_name: name,
        item_price: price,
        item_category: category,
        item_pic_url: pic,
        item_description: description,
        item_ownerid: sessionID

    });
    res.redirect("/myitem") 
});

//editpage
router.get('/edit/:id', function(req,res) {
    items.findAll({
        where: {
            id: req.params.id
        }
    }).then(result=> {
        console.log(result[0].dataValues)
        res.render('mobriseWebCarousell/edititem', {
            data: result[0],
            dataid: req.params.id
        });
    })
});

router.post('/edit/:id', function(req,res) {
    console.log(req.body);
    items.update({
        item_name: req.body.item_name,
        item_price: req.body.item_price,
        item_category: req.body.item_category,
        item_pic_url: req.body.item_url_pic,
      }, {
        where: {
          id: req.params.id
        }
      });
    res.redirect('/myitem')
});

//delete page
router.get('/delete/:id', function(req,res) {
    items.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/myitem')

});



var offers = require('../models/offers');


//allitem get only not user listing
const { Op } = require("sequelize");
router.get('/allitem',isAuthenticated, function(req,res) {
    items.findAll({
        where: {
            [Op.not]: {
                item_ownerid: req.session.passport.user.id
            }
        }
    }).then(result => {
        console.log(req.session.passport.user.id)
        res.render("mobriseWebCarousell/allitem", { data: result, message: ""})
    })
})


//buy page
router.get('/buy/:id', function(req,res) {
    items.findAll({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.render("mobriseWebCarousell/buyitem", {
            dataid: req.params.id,
            data: result[0]
        });
    })
});


router.post('/buy/:id',isAuthenticated, function(req,res) {
    var itemownerid = 0;
    var price = req.body.amt;
    items.findAll({
        where: {
            id: req.params.id
        }
    }).then(result => {
        itemownerid = result[0].item_ownerid 
        // console.log(result.dataValues.item_ownerid)
        offers.create({
            offer_amt: price,
            offrer_id: req.session.passport.user.id,
            item_id: req.params.id,
            item_ownerid: itemownerid

        })
    })
    res.redirect("/allitem") 
});




users.hasMany(offers, {
    foreignKey: 'offrer_id'
});
offers.belongsTo(users, {
    foreignKey: "offrer_id"
});

items.hasMany(offers, {
    foreignKey: 'item_id'
});
offers.belongsTo(items, {
    foreignKey: "item_id"
});

// router.get('/test', function(req,res) {
//     offers.findAll({
//         include: [
//             {
//                 model: users,

//             }
//         ]
//     }).then(offer => {
//         console.log(offer[0])
//         res.json(offer)
//     })
// });

router.get('/pending',isAuthenticated, function(req,res) {
    var arr = []
    var name = "";
    var offrer = "";
    var amt = 0;
    var offerprop = {name,offrer,amt}
    offers.findAll({
        where: {
            item_ownerid: req.session.passport.user.id
        },
        include: [
            {
                model: items
            },
            {
                model: users
            }
        ]
    }).then(offers => {
        console.log(offers)
        offers.forEach(offer => {
            console.log(".......")
            console.log(offer.dataValues.offer_amt)
            offerprop.amt = offer.dataValues.offer_amt
            console.log(offer.dataValues.item.dataValues.item_name)
            offerprop.name = offer.dataValues.item.dataValues.item_name
            console.log(offer.dataValues.user.dataValues.username)
            offerprop.offrer = offer.dataValues.user.dataValues.username
            arr.push(offerprop)
        })
        // console.log(offers[1].dataValues.id)
        // res.json("done")
        res.render('mobriseWebCarousell/pending', {data: offers})
    })
});



// router.get('/pending',id function(req,res) {
//     var arr = []
//     var name = "";
//     var offrer = "";
//     var amt = 0;
//     var offerprop = {name,offrer,amt}
//     offers.findAll({
//         where: {
//             item_ownerid: 88
//         },
//         include: [
//             {
//                 model: items
//             },
//             {
//                 model: users
//             }
//         ]
//     }).then(offers => {
//             console.log(offers)
//             offers.forEach(offer => {
//                 console.log(".......")
//                 console.log(offer.dataValues.offer_amt)
//                 offerprop.amt = offer.dataValues.offer_amt
//                 console.log(offer.dataValues.item.dataValues.item_name)
//                 offerprop.name = offer.dataValues.item.dataValues.item_name
//                 console.log(offer.dataValues.user.dataValues.username)
//                 offerprop.offrer = offer.dataValues.user.dataValues.username
//                 arr.push(offerprop)
//             })
//         //}
//         // res.json("done")
//         res.render('mobriseWebCarousell/pending', {data: offers})
//     })
// });


//accept
router.get('/accept/:id', function(req,res) {
    offers.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pending')
})

//reject
router.get('/reject/:id', function(req,res) {
    offers.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/pending')
})








module.exports = router;