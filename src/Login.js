import React, { useState } from "react";
import { useEffect } from "react";

var errormsg;

function Login(props) {
  useEffect(() => {
    document.getElementById("error-message-login").style.display = "none";
  });
  const [toogle, settoogle] = useState();
  let render;
  if (!toogle) {
    render = (
      <div id="login">
        <h2>Login</h2>
        <div id="error-message-login">
          Email und Passwort stimmen nicht überein.
        </div>
        <label htmlFor="email">email</label>
        <br />
        <input type="text" name="username" className="login-input" />
        <br />
        <label htmlFor="password">password</label>
        <br />
        <input type="password" name="password" className="login-input" />
        <br />
        <button id="login-button" onClick={login}>
          Log in
        </button>
        <p>
          No account yet?
          <button onClick={() => settoogle(true)} id="ls-switch">
            Sign Up
          </button>
        </p>
      </div>
    );
  } else {
    render = (
      <div id="login">
        <h2>Sign Up</h2>
        <div id="error-message-login"></div>
        <label htmlFor="email">email</label>
        <br />
        <input type="text" name="username" className="login-input" />
        <br />
        <label htmlFor="password">password</label>
        <br />
        <input
          type="password"
          name="password"
          className="login-input"
          id="pass1"
        />
        <br />
        <label htmlFor="username">username</label>
        <br />
        <input type="text" name="username" className="login-input" />
        <br />
        <label htmlFor="password">repeat password</label>
        <br />
        <input
          type="password"
          name="password"
          className="login-input"
          id="pass2"
        />
        <br />
        <button id="login-button" onClick={signup}>
          Sign Up
        </button>
        <br />
        <p>
          Already have an account?{" "}
          <button onClick={() => settoogle(false)} id="ls-switch">
            Log in
          </button>
        </p>
      </div>
    );
  }
  return <div id="login-parent">{render}</div>;
}
function login() {
  let x = document.querySelectorAll(".login-input");
  if (x[0].value.includes("@")) {
    fetch("http://localhost:8080/login/" + x[0].value + "&" + x[1].value)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res == true) {
          window.localStorage.setItem("email", x[0].value);
          window.localStorage.setItem("password", x[1].value);
          window.location.reload();
        }
        if (res == false) {
          document.getElementById("error-message-login").innerHTML =
            "Email und Passwort stimmen nicht überein.";
          document.getElementById("error-message-login").style.display =
            "block";
        } else {
          document.getElementById("error-message-login").innerHTML =
            "Es exestiert kein account mit dieser Email";
          document.getElementById("error-message-login").style.display =
            "block";
        }
      });
  } else {
    document.getElementById("error-message-login").innerHTML =
      "Email muss ein @ enthalten";
    document.getElementById("error-message-login").style.display = "block";
  }
}
function signup() {
  let canpr = true;
  let data = document.querySelectorAll(".login-input");
  let email = data[0].value;
  let username = data[2].value;
  let password = data[1].value;
  if (canfetch(data)) {
    fetch(
      "http://localhost:8080/signup/" + email + "&" + username + "&" + password
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.exists == false) {
          document.getElementById("error-message-login").innerHTML =
            "account wurde erstellt";
          document.getElementById("error-message-login").style.display =
            "block";
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("password", password);
          window.location.reload();
        } else {
          document.getElementById("error-message-login").innerHTML =
            "account exestiert bereits";
          document.getElementById("error-message-login").style.display =
            "block";
        }
      });
  } else {
    document.getElementById("error-message-login").innerHTML = errormsg;
    document.getElementById("error-message-login").style.display = "block";
  }
}
function canfetch(data) {
  if (hasWhiteSpace(data[0].value) || !data[0].value.includes("@")) {
    // email
    errormsg = "email darf keine Leerzeichen haben und muss ein @ beinhalten";
    return false;
  }
  if (hasWhiteSpace(data[1].value) || data[1].value.length < 8) {
    //pass1
    errormsg =
      "Passwort darf keine Leerzeichen haben und muss länger als 8 zeichen sein";
    return false;
  }
  if (hasWhiteSpace(data[2].value) || data[2].value.length <= 1) {
    //username
    errormsg = "Username darf keine Leerzeichen haben oder leer sein";
    return false;
  }
  if (!(data[1].value == data[3].value)) {
    errormsg = "Passwörter müssen übereinstimmen";
    return false;
  }
  return true;
}
function hasWhiteSpace(s) {
  return s.indexOf(" ") >= 0;
}
export default Login;
