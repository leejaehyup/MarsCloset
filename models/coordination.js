/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('coordination', {
		cCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		cTop: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		cBottoms: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		cDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		cNum: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		userID: {
			type: DataTypes.STRING(20),
			allowNull: true,
			references: {
				model: 'user',
				key: 'userid'
			}
		},
		rfid_number: {
			type: DataTypes.STRING(40),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'dcloset',
				key: 'rfid_number'
			}
		},
		wCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'weather',
				key: 'wcode'
			}
		}
	}, {
		tableName: 'coordination',
		timestamps: false
	});
};
