import { useState } from "react";
import { TodoItem } from "./TodoItem";

export function TodoList({ todos, editTodo, setTodos, toggleTodo, deleteTodo }) {
  const [editId, setEditId] = useState("");
  function toggleEditId(id){
    if (editId === id){
      setEditId("");
      return;
    }

    setEditId(id)
  }

  return (
    <div>
      <h1 className="header"> Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No todos"}
        {(todos).map((todo, id) => {
          return (
            <TodoItem
              {...todo}
              key={todo.id}
              editId={editId}
              toggleEditId={toggleEditId}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          );
        })}
      </ul>
    </div>
  );
}
