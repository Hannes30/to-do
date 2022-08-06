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
      <ul>
        <h2>Tasks</h2>
        {ArrayRes.map((data, index) => {
          if (data.Done == 0) {
            console.log(index);
            return (
              <Task Title={data.Title} TimeDue={data.TimeDue} key={index} />
            );
          }
        })}
      </ul>
      {reset()}
    </div>
  );
}
export default Tasks;
function reset() {
  fetch("http://localhost:8080/reset");
}
