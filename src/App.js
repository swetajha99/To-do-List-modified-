import React, { useState } from "react";
import "./styles.css";
import List from "./List";
import Alert from "./Alert";
export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <React.Fragment>
      <main>
        <section className="container">
          <form className="form" onSubmit={handleSubmit}>
            {alert.show && <Alert />}
            <h2>To do List</h2>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="eg: eggs"
              className="form-control"
            />
            <button type="submit">Add</button>
          </form>
          <div className="grocery-container">
            <List />
            <button className="clear-btn">Clear Items</button>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
