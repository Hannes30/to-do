import React, { useState, useEffect } from "react";

const x = new Date();
const url = "https://dodo-furt-backend.herokuapp.com";
const fot = {
  mode: "no-cors",
};
let id;
function Task(props) {
  id = props.id;
  useEffect(() => {}, []);
  const TimteToString = () => {
    let options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    if (props.TimeDue != null) {
      let Datum = new Date(props.TimeDue);
      return Datum.toLocaleDateString("de-at", options);
    }
    return "";
  };
  return (
    <div className="Task">
      <a className="check_container" onClick={checked}>
        <svg xmlns="http://www.w3.org/2000/svg" className="check-circel">
          <g fill="transparent">
            <circle stroke="black" strokeWidth="2" cx="30" cy="25" r="15" />
            <path d="M520.5 78.1z" />
          </g>
        </svg>
        <div className="check-tick">✔</div>
      </a>
      <h2 className="Task-Name">
        <span>{props.Title}</span>
      </h2>
      <h2>
        <p className="Task-Time">{TimteToString()}</p>
      </h2>
    </div>
  );
}
function checked() {
  fetch(url + "/check/" + id).then((res) => window.location.reload());
}
export default Task;
