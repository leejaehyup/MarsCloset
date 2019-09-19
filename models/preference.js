/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('preference', {
		pCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		pLovely: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		pChic: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		pStreet: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		pDandy: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		userID: {
			type: DataTypes.STRING(20),
			allowNull: true,
			references: {
				model: 'user',
				key: 'userid'
			}
		}
	}, {
		tableName: 'preference',
		timestamps: false
	});
};
