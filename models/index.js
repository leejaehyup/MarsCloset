const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    operatorsAliases: false,
    logging: false // true시 -> log에 정보 나옴
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== "index.js" &&
      file !== "migrations" &&
      file !== "redshift-migrations"
    );
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }

  db[modelName]
    .sync()
    .then(result => {
      // some logic
    })
    .catch(err => {
      // some logic
    });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
