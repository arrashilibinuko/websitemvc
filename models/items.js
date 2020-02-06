var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var Items = sequelize.define('items',{
    id: {
		type: Sequelize.BIGINT(11),
		autoIncrement: true,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	item_pic_url: {
		type: Sequelize.STRING(200),
		allowNull: true,
		unique: false,
	},
	item_name: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	item_price: {
		type: Sequelize.BIGINT(11),
		allowNull: false,
	},
	item_category: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	item_ownerid: {
		type: Sequelize.BIGINT(11),
		allownull: false
	},
	item_description: {
		type: Sequelize.STRING(200),
		allowNull: false,
	}

}, {
	underscored: true,
	timestamps: false,
	createAt: false,
	paranoid: true
})


Items.sync({
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



module.exports = Items