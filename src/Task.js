import React, { useState, useEffect } from "react";

const x = new Date();

function Task(props) {
  useEffect(() => {}, []);
  const TimteToString = () => {
    let options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let Datum = new Date(props.TimeDue);
    return Datum.toLocaleDateString("de-at", options);
  };
  return (
    <div className="Task">
      <svg xmlns="http://www.w3.org/2000/svg" className="check_circel">
        <g fill="transparent">
          <circle stroke="black" strokeWidth="2" cx="20" cy="20" r="20" />
          <path d="M520.5 78.1z" />
        </g>
      </svg>
      <h2 className="Task-Name">
        <span>{props.Title}</span>
        <p className="Task-Time">{TimteToString()}</p>
      </h2>
    </div>
  );
}

export default Task;
