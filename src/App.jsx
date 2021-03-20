import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
import "./App.css";
import GetTasks from "./task";


function App() {
  return (
    <ChakraProvider>
      <div className="App App-header">
        <GetTasks></GetTasks>
      </div>
      </ChakraProvider>
  );
}

export default App;
