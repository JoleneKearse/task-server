// packages
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// file imports
const taskSchema = require("./model/Task");

const Task = mongoose.model("Tasks", taskSchema);

const mongoDBAccess =
  "mongodb+srv://practiceuser:practiceuser123@task-class2.kudkztr.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoDBAccess, { useNewUrlParser: true })
  .then(() => {
    console.log("Your app connected to MongoDB! 😁");
  })
  .catch((err) => {
    console.log(err, "😤");
  });

// listen to the port

const port = 8000;

app.listen(port, () => {
  console.log("We are in port ", port);
});

// CRUD
// ----------------------
// CREATE new task in DB
// ----------------------
// const newTask = new Task({
//   name: "Review Class 2",
//   date: "02/02/23",
//   isCompleted: false,
// });

// newTask.save();

// READ task from DB
// ----------------------
Task.find((err, tasks) => {
  if (err) {
    console.log(err);
  }
  console.log(tasks);
});
