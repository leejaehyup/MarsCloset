/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "closet",
    {
      closetID: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      dehumidfyingWeight: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      deodorizationWeight: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      Weight: {
        type: DataTypes.INTEGER(30),
        allowNull: true
      }
    },
    {
      tableName: "closet",
      timestamps: false
    }
  );
};
