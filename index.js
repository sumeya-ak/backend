const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());

const DATA_FILE = path.join(__dirname, "tasks.json");
function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading tasks:", err);
    return [];
  }
}
function writeTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing tasks:", err);
  }
}
let tasks = readTasks();
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Valid title is required" });
  }
  const newTask = { id: Date.now(), title: title.trim(), completed: false };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.completed = true;
  writeTasks(tasks);
  res.json(task);
});
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  writeTasks(tasks); 
  res.status(204).send();
});
app.get("/", (req, res) => {
  res.send("Task Manager API with JSON file storage is running!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
