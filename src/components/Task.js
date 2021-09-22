import React from "react";
import { FaTimes } from "react-icons/fa";

function Task({ task, onDelete, reminder }) {
  return (
    <div
      onDoubleClick={() => reminder(task.id)}
      className={`task ${task.reminder ? "reminder" : ""}`}
    >
      <h3>
        {task.text}{" "}
        <FaTimes
          onClick={() => onDelete(task.id)}
          style={{ color: "red", cursor: "pointer" }}
        />
      </h3>
      <p>{task.time}</p>
    </div>
  );
}

export default Task;
