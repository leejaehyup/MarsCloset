const sequelizeAuto = require("sequelize-auto");
const auto = new sequelizeAuto(
  process.env.AWS_DB_DATABASE,
  process.env.AWS_DB_USER,
  process.env.AWS_DB_PASSWORD,
  {
    host: process.env.AWS_DB_HOST,
    dialect: process.env.AWS_DB_DIALECT,
    directory: "models",
    port: process.env.AWS_DB_PORT,
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
