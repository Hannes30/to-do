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
      <h2 className="Task-Name">
        <span>{props.Title}</span>
        <p className="Task-Time">{TimteToString()}</p>
      </h2>
    </div>
  );
}

export default Task;
