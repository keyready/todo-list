/**
 * Вот возможное решение задачи, которое я описал в тз.
 * Тут, в принципе, все хорошо, ровненько. Можешь изучать
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = 5000;

const database = require("./config/db.connect");
const { TodoModel, UserModel } = require("./models");

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

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization.includes("Bearer")) {
    return res.status(403).json({ message: "Неверный тип токена" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }

  if (token === "null") {
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }

  const userId = JSON.parse(token);
  if (!userId.hasOwnProperty("id")) {
    return res.status(403).json({ message: "Пользователь не авторизован" });
  }

  req.userId = userId.id;

  next();
};

app.get("/get_todos", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const todosList = await TodoModel.findAll({
      raw: true,
      where: { userId },
    });

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

app.post("/create_todo", authMiddleware, async (req, res) => {
  try {
    const title = req.body.title;
    const userId = req.userId;

    await TodoModel.create({
      title,
      userId,
    });
    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(201).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/complete_todo", authMiddleware, async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const userId = req.userId;

    await TodoModel.update(
      { status: "completed" },
      { where: { id: todoId, userId } }
    );

    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/delete_todo", authMiddleware, async (req, res) => {
  try {
    const todoId = req.body.todoId;
    const userId = req.userId;

    await TodoModel.destroy({ where: { id: todoId, userId } });

    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/change_todo_title", authMiddleware, async (req, res) => {
  try {
    const { newTitle, todoId } = req.body;
    const userId = req.userId;

    await TodoModel.update(
      { title: newTitle },
      { where: { id: todoId, userId } }
    );

    const todosList = await TodoModel.findAll({ raw: true });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/create_user", async (req, res) => {
  try {
    const { username, password } = req.body;

    const candidate = await UserModel.findOne({
      raw: true,
      where: { username },
    });

    if (candidate) {
      return res
        .status(409)
        .json({ message: "Пользователь с таким именем уже существует" });
    }

    const newUser = await UserModel.create({
      username,
      password,
    });

    return res.status(201).json(newUser);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/login_user", async (req, res) => {
  try {
    const { username, password } = req.body;

    const candidate = await UserModel.findOne({
      raw: true,
      where: { username },
    });

    if (!candidate) {
      return res
        .status(404)
        .json({ message: "Пользователь с таким именем не найден" });
    }

    if (candidate.password !== password) {
      return res.status(403).json({ message: "Неверный пароль" });
    }

    return res.status(200).json(candidate);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

StartServer();
