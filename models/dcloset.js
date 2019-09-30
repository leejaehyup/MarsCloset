/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dcloset', {
		rfid_number: {
			type: DataTypes.STRING(40),
			allowNull: false,
			primaryKey: true
		},
		cloImg: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		userID: {
			type: DataTypes.STRING(20),
			allowNull: true,
			references: {
				model: 'user',
				key: 'userid'
			}
		},
		category: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		subclass1: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Color: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(12),
			allowNull: true
		},
		dcloDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		subclass2: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		subclass3: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		subclass4: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		season: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		hangerID: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		tableName: 'dcloset',
		timestamps: false
	});
};
