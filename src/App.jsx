import "./App.css";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} exact/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>

    // <Todo />
  );
}

export default App;
