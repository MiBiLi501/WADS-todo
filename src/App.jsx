import "./App.css";
import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Landing />}  /> */}
        <Route path="/" element={<Todo />} exact/>
      </Routes>
    </Router>

    // <Todo />
  );
}

export default App;
