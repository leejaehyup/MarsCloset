require("dotenv").config(); // this is important!
module.exports = {
  username: process.env.AWS_DB_USER,
  password: process.env.AWS_DB_PASSWORD,
  database: process.env.AWS_DB_DATABASE,
  host: process.env.AWS_DB_HOST,
  dialect: process.env.AWS_DB_DIALECT
};
