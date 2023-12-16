const { Sequelize } = require("sequelize");

module.exports = new Sequelize("todo-list", "postgres", "UserSQL", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});
