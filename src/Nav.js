import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <div id="nav">
        <h2 className="creator-Name">
          <a href="https://hannes-scheibelauer.de/">Hannes scheibelauer</a>
        </h2>
        <h1>DO-DO</h1>
        <img
          src={require("./Images/logo.png")}
          alt="DO-DO logo"
          className="logo"
        />
      </div>
    );
  }
}

export default Nav;
