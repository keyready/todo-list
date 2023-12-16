const { DataTypes } = require("sequelize");
const database = require("../config/db.connect");

module.exports = database.define(
  "todos",
  {
    title: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: "active" },
  },
  { modelName: "todos", timestamps: false }
);
