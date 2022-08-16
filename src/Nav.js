import React from "react";

class Nav extends React.Component {
  render() {
    return (
      <div id="nav">
        <h1 id="main-header">DO-DO</h1>
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
