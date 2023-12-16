/**
 * Вот возможное решение задачи, которое я описал в тз.
 * Тут, в принципе, все хорошо, ровненько. Можешь изучать
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = 5000;

const database = require("./config/db.connect");
const { TodoModel } = require("./models");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

const StartServer = async () => {
  try {
    await database.sync({ alter: true });
    await app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  } catch (e) {
    console.log(`Сервер запустить не удалось, причина: ${e}`);
  }
};

app.get("/get_todos", async (req, res) => {
  try {
    const todosList = await TodoModel.findAll({ raw: true });

    if (!todosList.length) {
      return res.status(200).json([]);
    }

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/create_todo", async (req, res) => {
  try {
    const title = req.body.title;

    await TodoModel.create({
      title,
    });
    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(201).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/complete_todo", async (req, res) => {
  try {
    const todoId = req.body.todoId;

    await TodoModel.update({ status: "completed" }, { where: { id: todoId } });

    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/delete_todo", async (req, res) => {
  try {
    const todoId = req.body.todoId;

    await TodoModel.destroy({ where: { id: todoId } });

    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/change_todo_title", async (req, res) => {
  try {
    const { newTitle, todoId } = req.body;

    await TodoModel.update({ title: newTitle }, { where: { id: todoId } });

    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

StartServer();
