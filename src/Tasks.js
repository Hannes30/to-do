import Task from "./Task";
import React, { useState, useEffect } from "react";
let ArrayRes = [];
var id;
const url = "https://dodo-furt-backend.herokuapp.com/";
const fot = {
  mode: "no-cors",
};

function Tasks(props) {
  id = props.id;
  const [rerender, setrerender] = useState(null);
  let renderList = ArrayRes.map((item, index) => <Task Name={item["Title"]} />);

  useEffect(() => {
    FetchTas();
  }, []);

  const FetchTas = () => {
    fetch(url + "/tasks/" + props.id)
      .then((res) => res.json())
      .then((res) => {
        ArrayRes = res;
        setrerender("");
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <h3 id="username">User: {props.username}</h3>
      <button id="new-task-button" onClick={DisplayNewTaskInterface}>
        New Task
      </button>
      <button
        id="logout-button"
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
      <ul>
        <h2>Tasks</h2>
        <div id="tasks">
          {ArrayRes.map((data, index) => {
            if (data.Done == 0) {
              return (
                <Task
                  Title={data.Title}
                  TimeDue={data.TimeDue}
                  key={index}
                  id={data.Taskid}
                />
              );
            }
          })}
        </div>
      </ul>
      <div id="newTask-modal">
        <h2>New Task</h2>
        <p id="new-task-error"> Name darf nicht leer sein</p>
        <label htmlFor="task-name">Task Name: </label>
        <br />
        <input
          className="new-task-input"
          type="text"
          placeholder="Task Name"
          name="task-name"
        ></input>{" "}
        <br />
        <label htmlFor="task-name">Time Due: </label>
        <br />
        <input
          type="date"
          id="Task-Time-Due"
          className="new-task-input"
        ></input>
        <br />
        <button id="create-task-button" onClick={newTask}>
          Create Task
        </button>
      </div>
    </div>
  );
}
function DisplayNewTaskInterface() {
  document.addEventListener("mouseup", function (e) {
    var container = document.getElementById("newTask-modal");
    if (!container.contains(e.target)) {
      container.style.display = "none";
    }
  });
  document.getElementById("newTask-modal").style.display = "block";
}
function newTask() {
  let data = document.querySelectorAll(".new-task-input");
  let name = data[0].value;
  let TimeDue = data[1].value;
  if (name != "") {
    console.log(name + " Time:" + TimeDue);
    document.getElementById("new-task-error").style.visibility = "hidden";
    fetch(url + "/newtask/" + id + "&" + name + "&" + TimeDue)
      .then((res) => res.json())
      .then((res) => {
        if (res.done == true) {
          window.location.reload();
        }
      });
  } else {
    document.getElementById("new-task-error").style.visibility = "visible";
  }
}
export default Tasks;
