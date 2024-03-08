import { useState } from "react";
import {db} from "../firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore";

export function TodoForm({ user }) {
  const [newItem, setNewItem] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();


    if (newItem === "") return;
    
    try{
      await addDoc(collection(db, "users", user.uid, "tasks"), {
        title: newItem,
        completed: false,
        created: Timestamp.now()
      })
    }    catch(err) {
      alert(err);
    }

    setNewItem("");
  }

  return (
    <div>
      <form className="new-item-form">
        <div className="form-row">
          <label className="font-mono text-center text-2xl" htmlFor="item">New item</label>
          <input
            className="font-mono"
            placeholder="Enter to-do name"
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className={"font-mono btn hover:animate-pulse "} onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
