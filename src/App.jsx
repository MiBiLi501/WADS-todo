import "./App.css";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [avatarImg, setAvatarImg] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if(user) setUser(user);
    else setUser(null);
  })

  

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Todo user={user} setUser=
        {setUser} avatarImg={avatarImg} setAvatarImg={setAvatarImg}/>} exact/>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
      </Routes>
    </Router>

  );
}

export default App;
