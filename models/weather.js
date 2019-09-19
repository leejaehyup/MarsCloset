/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('weather', {
		wCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		wTemp: {
			type: DataTypes.DECIMAL,
			allowNull: false
		}
	}, {
		tableName: 'weather',
		timestamps: false
	});
};
