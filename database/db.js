const config = require("../config/config");
const sequelizeAuto = require("sequelize-auto");
const auto = new sequelizeAuto(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    directory: "models",
    port: 3306,
    additional: {
      timestamps: false
    }
  }
);
auto.run(function(err) {
  if (err) throw err;

  console.log(auto.tables);
  console.log(auto.foreignKeys);
});

/*
const Sequelize = require("sequelize"); //ORM(Object Relation Mapping)을 도와주는 module
const db = {};
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,
    logging: false // true시 -> log에 정보 나옴
  }
);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/
