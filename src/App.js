import Nav from "./Nav";
import React from "react";
import Tasks from "./Tasks";
import Login from "./Login";

function App(props) {
  let render;
  if (isLoggedin()) {
    render = <Tasks />;
  } else {
    render = (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <div>
      <Nav />
      {render}
      <p id="footer">
        <a href="https://hannes-scheibelauer.de/">© Hannes scheibelauer</a>
      </p>
    </div>
  );
  function isLoggedin() {
    if (localStorage.getItem("email") != null) {
      return true;
    } else {
      return false;
    }
  }
}

export default App;
