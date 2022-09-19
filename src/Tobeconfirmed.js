import React from "react";

function Tobeconfirmed(props) {
  return (
    <div id="tobeconfirmed">
      <h2>Email zu account aktivierung wurde an {props.email} gesendet.</h2>
      <br />
      <p>falsche email?</p>
      <button
        id="register-new"
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        {" "}
        Neu Registrieren
      </button>
    </div>
  );
}

export default Tobeconfirmed;
