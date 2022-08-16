import Task from "./Task";
import React, { useState, useEffect } from "react";
let ArrayRes = [];

function Tasks() {
  const [rerender, setrerender] = useState(null);
  let renderList = ArrayRes.map((item, index) => <Task Name={item["Title"]} />);

  useEffect(() => {
    FetchTas();
  }, []);

  const FetchTas = () => {
    /*fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((res) => {
        ArrayRes = res;
        setrerender("");
      })
      .catch((error) => alert(error));*/
  };
  return (
    <div>
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
              console.log(index);
              return (
                <Task Title={data.Title} TimeDue={data.TimeDue} key={index} />
              );
            }
          })}
        </div>
      </ul>
    </div>
  );
}
export default Tasks;
