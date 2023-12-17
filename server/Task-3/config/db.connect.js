const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "./Task-2/.env" });

module.exports = new Sequelize(
  process.env.PG_TABLE,
  process.env.PG_USER,
  process.env.PG_PASS,
  {
    dialect: "postgres",
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
  }
);
