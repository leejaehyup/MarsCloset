/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('season', {
		seasonNum: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		spring: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		summer: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		fall: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		winter: {
			type: DataTypes.INTEGER(1),
			allowNull: true
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
		tableName: 'season',
		timestamps: false
	});
};
