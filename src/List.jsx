import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./styles.css";
const List = ({ list, dltItem, editItem }) => {
  return (
    <div className="items">
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="each-item">
            <p className="tag">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="dlt-btn"
                onClick={() => dltItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
