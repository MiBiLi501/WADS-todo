import { useState } from "react";

export function TodoItem({ completed, id, title, editId, toggleEditId, editTodo, toggleTodo, deleteTodo }) {
  const [newName, setNewName] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  return (
    <li>
      <label>
        { editId === id ?
          <>
          <input
                type="text"
                className="textInput"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
          <button className="btn" onClick={(e)=>{
            setEditStatus(true);
            editTodo(id, newName);
            toggleEditId(id);
            }
          }>
            OK
          </button>
          </>
          :
          <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            if(editStatus){
              setEditStatus(false);
              return;
            }
            toggleTodo(id, e.target.checked);
          }}
        />

        }
        {title}
        { editId !== id &&
        <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
          Delete
        </button>
        }
        { editId !== id &&
        <button className="btn" onClick={() => toggleEditId(id)}>
          Edit
        </button>
        }
      </label>
    </li>
  );
}
