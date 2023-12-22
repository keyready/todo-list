const express = require("express");
const cors = require("cors");
const path = require("path");
const { log } = require("console");

const app = express();
const port = 5000;
let todos_list = [];

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../dist")));

app.post("/login_user", (req, res) => {
  try {
    const { username } = req.body;
    return res.status(200).json({
      id: 1,
      username,
    });
  }catch (error) {
    return res.status(500).json({ message: "что-то сломалось" });
  }
});


app.get("/get_todos", (req, res) => {
  try{
    res.status(200).json(todos_list);
}catch (error) {
  return res.status(500).json({ message: "что-то сломалось" });
}
});

app.post("/complete_todo", (req, res) => {
  try{
    const { todoId } = req.body;

    todos_list.map((element) => {
      if (todoId === element.id) {
        element.status = "completed";
      }
    });

    return res.status(200).json(todos_list);
  }catch (error) {
    return res.status(500).json({ message: "что-то сломалось" });
  }
});

app.post("/delete_todo", (req, res) => {
  try {
    const { todoId } = req.body;

    todos_list = todos_list.filter((todo) => todoId !== todo.id);
    return res.status(200).json(todos_list);
  }catch (error) {
    return res.status(500).json({ message: "что-то сломалось" });
  }
});

app.post("/create_todo", (req, res) => {
  try {
    const { title } = req.body;

    todos_list.push({
      title: title,
      status: "active",
      id: todos_list.length + 1,
    });

    return res.status(201).json(todos_list);
  }catch (error) {
    return res.status(500).json({ message: "что-то сломалось" });
  }
});

app.post("/change_todo_title", (req, res) => {
  try {
    const { todoId, newTitle } = req.body;

    todos_list.map((todo) => {
      if (todo.id === todoId) {
        todo.title = newTitle;
      }
    });

    return res.status(200).json(todos_list);
  } catch (error) {
    return res.status(500).json({ message: "что-то сломалось" });
  }
});

app.get("/*", (req, res) => {
  try {
    return res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  }catch (error) {
    return res.status(500).json({ message: "что-то сломалось" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhot:${port}`);
});
