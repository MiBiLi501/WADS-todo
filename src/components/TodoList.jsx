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
    <div className="h-4/5 px-5 py-1 my-5 bg-gradient-to-b from-blue-950">
      <h1 className="header font-mono"> Todo List</h1>
      <ul className="list overflow-ellipsis">
        <div className="font-mono">{todos.length === 0 && "No todos"}</div>
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
