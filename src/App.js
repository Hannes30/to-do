import Nav from "./Nav";
import React, { useState } from "react";
import Tasks from "./Tasks";
import Login from "./Login";
import Tobeconfirmed from "./Tobeconfirmed";

const url = "https://dodo-furt-backend.herokuapp.com";

let shouldfetch = true;

function App(props) {
  const [render, setrender] = useState();
  let help;
  if (isLoggedin() && shouldfetch) {
    fetch(
      url +
        "/isconfirmed/" +
        window.localStorage.getItem("email") +
        "&" +
        window.localStorage.getItem("password")
    )
      .then((res) => res.json())
      .then((res) => {
        if (res == true) {
          help = (
            <div>
              <Tasks
                id={window.localStorage.getItem("id")}
                username={window.localStorage.getItem("username")}
              />
            </div>
          );
          setrender(help);
        } else {
          console.log("not confirmed");
          help = <Tobeconfirmed email={window.localStorage.getItem("email")} />;
          setrender(help);
        }
        shouldfetch = false;
        setTimeout(() => (shouldfetch = true), 1000);
      });
  } else if (shouldfetch) {
    help = (
      <div>
        <Login />
      </div>
    );
    setrender(help);
    shouldfetch = false;
    setTimeout(() => (shouldfetch = true), 1000);
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
