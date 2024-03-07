import "../App.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { doc, deleteDoc, updateDoc, collection, query, onSnapshot, orderBy } from "@firebase/firestore";
import { signOut } from "firebase/auth"
import { auth, db } from "../firebase"

function Todo({user, setUser}) {
  console.log(user)
  const [todos, setTodos] = useState([]);
  const [showUnchecked, setShowUnchecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { title, completed: false },
      ];
    });
  }

  async function logOut() {
    await signOut(auth)
  }

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTodos(querySnapshot.docs.map(doc => ({
        id: doc.id, 
        data: doc.data()})))
    })
  })

  async function toggleTodo(id, completed) {
    const todoDocRef = doc(db, "tasks", id);
    try{
      await updateDoc(todoDocRef, {
        completed: !completed
      })
    } catch(err){
      alert(err);
    }

  }

  // function deleteTodo(id) {
  //   setTodos((currentTodos) => {
  //     return currentTodos.filter((todo) => todo.id !== id);
  //   });
  // }

  async function deleteTodo(id) {
    const todoDocRef = doc(db, "tasks", id);
    try{
      await deleteDoc(todoDocRef);
    } catch (err){
      alert(err);
    }
  }

  // function editTodo(id, title) {
  //   if(title === "") return;
  //   setTodos((currentTodos) => {
  //     return currentTodos.map((todo) => {
  //       if(todo.id === id) {
  //         return { ...todo, title };
  //       }

  //       return todo;
  //     })
  //   })
  // }

  async function editTodo(id, newTitle) {
    if(newTitle === "") return;

    const todoDocRef = doc(db, "tasks", id);
    try{
      await updateDoc(todoDocRef,{
        title: newTitle
      })
    }
    catch (err){
      alert(err);
    }
  }

  function toggleUnchecked() {
    setShowUnchecked(!showUnchecked);
    return;
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className=" h-20">
          {user != null ? 
          <button className="btn" onClick={logOut}>Log out</button>
          :
          
            <Link to="/auth">
              <button className="btn">Sign in</button>
            </Link>
          
          }
        </div>
        <div className="p-5 bg-gradient-to-br from-gray-900 to-slate-800 h-full flex flex-col">
          <TodoForm addTodo={addTodo}/>
          <TodoList todos={todos} showUnchecked={showUnchecked} toggleUnchecked={toggleUnchecked} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
        </div>
      </div>
    </>
  );
}

export default Todo;
