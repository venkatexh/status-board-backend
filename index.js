require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/task");
const Status = require("./models/status");
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Status Board API");
});

app.get("/api/tasks/all", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/tasks/", async (req, res) => {
  try {
    const task = await Task.findById(req.query.taskId);
    return res.status(200).send(task);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).send(task);
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/tasks", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.query.taskId, req.body);
    return res.status(201).send(task);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/tasks", async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.body.taskId);
    return res.status(201).send(task);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/status", async (req, res) => {
  try {
    const statuses = await Status.find({});
    return res.status(200).send(statuses);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/status", async (req, res) => {
  try {
    const status = await Status.create(req.body);
    return res.status(201).send(status);
  } catch (err) {
    console.log(err);
  }
});

const pwd = process.env.MONGO_PWD;

mongoose
  .connect(
    `mongodb+srv://venkatesh:${pwd}@mycluster.fyzgz.mongodb.net/status-board?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database connected.."));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
