import fetch from "node-fetch";
import mysql from "mysql2";
import express from "express";

const app = express();
const port = 8080;

let count = 0;

var con = mysql.createConnection({
  host: "192.168.0.12",
  user: "hannes",
  password: "Hann3s3O",
  database: "DoDo",
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/gettask", (req, res) => {
  count++;
  con.connect(function (err) {
    if (err) throw err;
    con.query(`Select * from Tasks`, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get("/login/:id", (req, res) => {
  let email = req.params.id.split("&")[0].trim();
  let password = req.params.id.split("&")[1];
  console.log(email + " trys to log in");
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `Select * from Users where Email='${email}'`,
      function (err, result, fields) {
        if (err) throw err;
        try {
          console.log(result);
          if (result[0].Password == password) {
            res.send({
              sucess: true,
              id: result[0].ID,
              username: result[0].Name,
            });
          } else {
            res.send(false);
          }
        } catch {
          res.send("{}");
        }
      }
    );
  });
});
var help;
var help2 = false;
app.get("/signup/:id", (req, res) => {
  console.log(email + " trys to sign in");
  help2 = false;
  let email = req.params.id.split("&")[0].trim();
  let username = req.params.id.split("&")[1].trim();
  let password = req.params.id.split("&")[2];
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `Select * from Users where Email='${email}'`,
      function (err, result, fields) {
        if (err) throw err;
        if (result[0] == undefined) {
        } else {
          help2 = true;
        }
      }
    );
    con.query(`Select * from Users`, function (err, result, fields) {
      if (err) throw err;
      help = result.length;
      res.send(inserrtUser(help, password, email, username));
    });
  });
});
function inserrtUser(help, password, email, username) {
  if (!help2) {
    con.connect(function (err) {
      if (err) throw err;
      con.query(
        `INSERT INTO Users (ID, Password, Email, Name)VALUES (${help}, '${password}', '${email}', '${username}');`,
        function (err, result, fields) {
          if (err) throw err;
        }
      );
    });
  }
  return { exists: help2, id: help };
}
app.listen(port, console.log("listening on " + port));

app.get("/tasks/:id", (req, res) => {
  let id = req.params.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `Select * from Tasks where User=${id}`,
      function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      }
    );
  });
});
app.get("/check/:id", (req, res) => {
  let id = req.params.id;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      `UPDATE Tasks
      SET Done = 1 where Taskid=${id}`,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  });
  res.send({ done: true });
});
app.get("/newtask/:id", (req, res) => {
  let id = req.params.id.split("&")[0];
  var Taskid;
  con.connect(function (err) {
    if (err) throw err;
    con.query(`Select * from Tasks`, function (err, result, fields) {
      if (err) throw err;
      Taskid = result.length;
      newTask(req.params.id, Taskid);
    });
  });
  res.send({ done: true });
});
function newTask(reqid, taskid) {
  con.connect(function (err) {
    con.query(
      `INSERT INTO Tasks (User, Title, TimeDue, Taskid,Done)VALUES (${
        reqid.split("&")[0]
      }, '${reqid.split("&")[1]}', '${new Date(reqid.split("&")[2])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}', '${taskid}',0);`,
      function (err, result, fields) {
        if (err) throw err;
        console.log("task with" + taskid + " created");
        return;
      }
    );
  });
}
