import React, { useEffect, useState } from "react";
import "./styles.css";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
export default function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item) {
      showAlert(true, "please enter your to do", "danger");
    } else if (item && isEditing) {
      setList(
        list.map((e) => {
          if (e.id === editID) return { ...e, title: item };
          return e;
        })
      );
      setItem("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "Item updated", "success");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: item };
      setList([...list, newItem]);
      setItem("");
      showAlert(true, "To do Added", "success");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "Item Removed", "danger");
  };
  const edit = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setItem(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <React.Fragment>
      <main>
        <section className="container">
          <form className="form" onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} removeAlert={showAlert} list={list} />
            )}
            <h2>To do List</h2>
            <div className="controls">
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="eg:shopping"
                className="input"
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "Edit" : "Add"}
              </button>
            </div>
          </form>
          {list.length > 0 && (
            <div className="grocery-container">
              <List list={list} dltItem={deleteItem} editItem={edit} />
              <button
                className="clear-btn submit-btn"
                onClick={() => setList([])}
              >
                Clear Items
              </button>
            </div>
          )}
        </section>
      </main>
    </React.Fragment>
  );
}
