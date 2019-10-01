/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "LeeJaeHyup",
    {
      rfid: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      tableName: "LeeJaeHyup",
      timestamps: false
    }
  );
};
