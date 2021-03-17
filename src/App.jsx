import React, { useState, useEffect } from "react";
import "./App.css";
import GetTasks, {NewTasks} from "./task";
import GetOperations from "./operation";

function App() {
  return (
    <>
      <div className="App App-header">
          <NewTasks></NewTasks>
        <GetTasks></GetTasks>
        {/* <GetOperations></GetOperations> */}
      </div>
    </>
  );
}

export default App;
