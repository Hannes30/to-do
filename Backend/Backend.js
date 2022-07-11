import fetch from "node-fetch";
import mysql from "mysql2";
import express from "express";

const app = express();
const port = 8080;

let count = 0;

var con = mysql.createConnection({
  host: "localhost",
  user: "hannes",
  password: "hannes",
  database: "DoDo",
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("", (req, res) => {
  count++;
  console.log("in");
  con.connect(function (err) {
    if (err) throw err;
    con.query(`Select * from Tasks`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});
app.get("/reset", (req, res) => {
  count = 0;
  console.log("reset");
});
app.listen(port, console.log("listening on " + port));
