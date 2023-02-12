// packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// file imports
const taskSchema = require("./model/Task");

const Task = mongoose.model("Tasks", taskSchema);

const mongoDBAccess =
  "mongodb+srv://adminuser:adminuser123@task-class2.kudkztr.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDBAccess, { useNewUrlParser: true })
  .then(() => {
    console.log("Your app connected to MongoDB! 😁");
  })
  .catch((err) => {
    console.log(err, "😤");
  });

// listen to the port

const port = 3000;

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
// Task.find((err, tasks) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(tasks);
// });

// UPDATE task in the DB
// ----------------------
// Task.findOneAndUpdate(
//   { name: "Review Class 2" },
//   { name: "Review Class 3" },
//   (err, task) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(task);
//   }
// );

// DELETE task from DB
// ----------------------
// Task.findOneAndDelete({ _id: "63d8407d5f62c1df494d6524" }, (err, task) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(task, " deleted");
// });

// ----------------------
// ----------------------
// API
// ----------------------
// ----------------------

// CREATE
app.post("/task", (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    date: req.body.date,
    isCompleted: req.body.isCompleted,
  });
  newTask
    .save()
    .then((task) => res.send("task created"))
    .catch((err) => res.send(err));
});

// READ all tasks
app.get("/task", (req, res) => {
  Task.find((err, task) => {
    if (err) {
      res.send(err);
    }
    res.send(task);
  });
});

// READ task by id
app.get("/task/:id", (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.send(task);
  });
});

// UPDATE
// app.patch("/task/:id", (req, res) => {
//   Task.findOneAndUpdate(
//     req.params.id,
//     { name: "new name from update" },
//     (err, task) => {
//       if (err) {
//         res.send(err);
//       }
//       res.send(task);
//     }
//   );
// });

app.put("/task/:id", (req, res) => {
  Task.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      date: req.body.date,
      isCompleted: req.body.isCompleted,
    },
    (err, task) => {
      if (err) {
        res.send(err);
      }
      res.send(task);
    }
  );
});

// DELETE
app.delete("/task/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id, (err, task) => {
    if (err) {
      res.send(err);
    }
    res.send({ message: "success", data: task });
  });
});
