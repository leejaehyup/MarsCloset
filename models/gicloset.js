/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "gicloset",
    {
      cloImg: {
        type: DataTypes.STRING(250),
        allowNull: false,
        primaryKey: true
      },
      recom1: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      recom2: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      recom3: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      recom4: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      recom5: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      section: {
        type: DataTypes.INTEGER(4),
        allowNull: true
      },
      count: {
        type: DataTypes.INTEGER(3),
        allowNull: true
      }
    },
    {
      tableName: "gicloset",
      timestamps: false
    }
  );
};
