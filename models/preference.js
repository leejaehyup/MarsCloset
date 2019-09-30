/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('preference', {
		pcode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		userID: {
			type: DataTypes.STRING(20),
			allowNull: false,
			references: {
				model: 'user',
				key: 'userID'
			}
		},
		style: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'preference',
		timestamps: false
	});
};
