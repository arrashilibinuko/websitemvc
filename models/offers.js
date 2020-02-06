var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var Offers = sequelize.define('offers',{
    id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	item_id: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
	},
	item_ownerid: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
	},

	offrer_id: {
		type: Sequelize.BIGINT(11),
		allownull: false
    },
    offer_amt: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
	},

}, {
	underscored: true,
	timestamps: false,
	createAt: false,
	paranoid: true
})


Offers.sync({
	force: false
// }).then(function() {
// 	// Table created
// 	return User.create({
// 		username: 'admin',
// 		password: 'admin',
// 		role: 1,
// 		name: 'gnip',
// 		photo: 'http://nos.netease.com/house-public/bf37aa1e955b3a0e3798528fc3bcbd69.jpg'
// 	});
});



module.exports = Offers