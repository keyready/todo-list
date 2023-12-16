/**
 * Вот возможное решение задачи, которое я описал в тз.
 * Тут, в принципе, все хорошо, ровненько. Можешь изучать
 *
 * В идеале, конечно, подключать базу данных и хранить тудушки там, но это
 * следующее задание)
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const port = 5000;

const app = express();

const todosList = [
  { id: 1, title: "Закрыть сессию", status: "active" },
  { id: 2, title: "Сделать домашку", status: "active" },
  { id: 3, title: "Покормить кота", status: "active" },
];

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/get_todos", (req, res) => {
  try {
    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/create_todo", (req, res) => {
  try {
    const title = req.body.title;

    todosList.push({
      id: todosList.length + 1,
      title,
      status: "active",
    });

    return res.status(201).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/complete_todo", (req, res) => {
  try {
    const todoId = req.body.todoId;

    todosList.map((todo) => {
      if (todo.id === todoId) {
        todo.status = "completed";
      }
    });

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.post("/delete_todo", (req, res) => {
  try {
    const todoId = req.body.todoId;

    const foundIndex = todosList.findIndex((todo) => todo.id === todoId);
    if (foundIndex !== -1) {
      todosList.splice(foundIndex, 1);
    }

    return res.status(200).json(todosList);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "На сервере что-то громко упало..." });
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
