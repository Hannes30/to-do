import Task from "./Task";
import React, { useState, useEffect } from "react";
let ArrayRes = [];

function Tasks(props) {
  const [rerender, setrerender] = useState(null);
  let renderList = ArrayRes.map((item, index) => <Task Name={item["Title"]} />);

  useEffect(() => {
    FetchTas();
  }, []);

  const FetchTas = () => {
    fetch("http://localhost:8080/tasks/" + props.id)
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
    </div>
  );
}
export default Tasks;
