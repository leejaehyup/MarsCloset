/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "gimg_analysis",
    {
      gimgNum: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: "0"
      },
      gImg: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      gCategorize: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      gsubclass: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      gstyle: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      gtype: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      pattern: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      glength: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      userID: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      }
    },
    {
      tableName: "gimg_analysis",
      timestamps: false
    }
  );
};
