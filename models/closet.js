/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('closet', {
		closetID: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		closetName: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		dehumidfyingWeight: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		deodorizationWeight: {
			type: DataTypes.DECIMAL,
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
		Weight: {
			type: DataTypes.INTEGER(30),
			allowNull: true
		}
	}, {
		tableName: 'closet',
		timestamps: false
	});
};
