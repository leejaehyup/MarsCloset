/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('clotype', {
		typeCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		category: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		subclass: {
			type: DataTypes.STRING(45),
			allowNull: false
		}
	}, {
		tableName: 'clotype',
		timestamps: false
	});
};
