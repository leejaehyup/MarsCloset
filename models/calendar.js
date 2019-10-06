/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "calendar",
    {
      num: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      date: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      day: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      tableName: "calendar",
      timestamps: false
    }
  );
};
