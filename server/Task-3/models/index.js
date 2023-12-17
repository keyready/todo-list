const TodoModel = require("./todo.model");
const UserModel = require("./user.model");

UserModel.hasMany(TodoModel);

module.exports = {
  TodoModel,
  UserModel,
};
