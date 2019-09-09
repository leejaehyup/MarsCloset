/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('hanger', {
		hCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
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
			references: {
				model: 'dcloset',
				key: 'rfid_number'
			}
		}
	}, {
		tableName: 'hanger',
		timestamps: false
	});
};
