const express = require("express");
const cors = require("cors");
const path = require("path");
const { log } = require("console");

const app = express();
const port = 5000;
const todos_list = [
  { id: 1, title: "Вечерний хлобысь", status: "active" },
  { id: 2, title: "Вечерний хлобысь", status: "active" },
  { id: 3, title: "Вечерний хлобысь", status: "active" },
  { id: 4, title: "Вечерний хлобысь", status: "active" },
];

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../dist")));

app.post("/login_user", (req, res) => {
  const { username } = req.body;
  return res.status(200).json({
    id: 1,
    username,
  });
});

app.get("/get_todos", (req, res) => {
  res.status(200).json(todos_list);
});

app.post("/complete_todo", (req, res) => {
  const { todoId } = req.body;

  todos_list.map((element) => {
    if (todoId === element.id) {
      element.status = "completed";
    }
  });

  return res.status(200).json(todos_list);
});

app.get("/*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhot:${port}`);
});
