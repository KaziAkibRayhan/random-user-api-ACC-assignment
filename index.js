const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
let users = require("./users/users.json");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.get("/user/random", (req, res) => {
//   const randomNumber = Math.floor(Math.random() * 10);
//   console.log(randomNumber);
//   res.send(randomNumber);
// });

app.get("/user/all", (req, res) => {
  const { limit } = req.query;
  res.send(users.slice(0, limit));
});

app.post("/user/save", (req, res) => {
  users.push(req.body);
  res.send(users);
});

app.patch("/user/update/:id", (req, res) => {
  const { id } = req.params;
  let updatedData = users.find((user) => user.Id === Number(id));
  updatedData = req.body;
  res.send(updatedData);
});
app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  const remainingData = users.filter((user) => user.Id !== Number(id));
  res.send(remainingData);
});

app.get("/", (req, res) => {
  res.send("Random user running on server!");
});

app.all("*", (req, res) => {
  res.send("No Routes Found!");
});
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Random user api running on ${PORT}`);
});
