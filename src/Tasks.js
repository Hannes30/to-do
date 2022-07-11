import Task from "./Task";
import React, { useState, useEffect } from "react";
let ArrayRes = [];

function Tasks() {
  const people = [
    { id: 1, name: "Johnny", gender: "male", age: 30 },
    { id: 2, name: "Jenny", gender: "female", age: 28 },
    { id: 3, name: "Sam", gender: "male", age: 13 },
    { id: 4, name: "Dean", gender: "male", age: 8 },
  ];
  const [rerender, setrerender] = useState(null);
  let renderList = ArrayRes.map((item, index) => <Task Name={item["Title"]} />);

  useEffect(() => {
    FetchTas();
  }, []);

  const FetchTas = () => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((res) => {
        ArrayRes = res;
        setrerender("");
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <ul>
        {ArrayRes.map((data, index) => {
          return <Task Title={data.Title} TimeDue={data.TimeDue} key={index} />;
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
