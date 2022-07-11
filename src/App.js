import Nav from "./Nav";
import React from "react";
import Tasks from "./Tasks";

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <h2 id="Tasks-Header">Tasks</h2>
        <div id="Tasks">
          <Tasks />
        </div>
      </div>
    );
  }
}

export default App;
