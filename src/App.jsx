import "./App.css";
import Todo from "./pages/Todo";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [avatarImg, setAvatarImg] = useState(null);

  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo user={user} setUser=
        {setUser} avatarImg={avatarImg} setAvatarImg={setAvatarImg}/>} exact/>
        <Route path="/auth" element={<Auth user={user} setUser={setUser}/>}/>
      </Routes>
    </Router>

  );
}

export default App;
