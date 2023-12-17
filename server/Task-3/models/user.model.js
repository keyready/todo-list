const { DataTypes } = require("sequelize");
const database = require("../config/db.connect");

module.exports = database.define(
  "users",
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { modelName: "users", timestamps: false }
);
