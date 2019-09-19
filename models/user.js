/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		userID: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true
		},
		userName: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		userPWD: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		userGender: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		phoneNum: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		residence: {
			type: DataTypes.STRING(30),
			allowNull: false
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};
