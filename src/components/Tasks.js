import React from "react";
import Task from "./Task.js";

function Tasks({ tasks, onDelete, reminder }) {
  return (
    <div>
      {tasks.map((task,i) => {
        return (
          <Task
            reminder={reminder}
            onDelete={onDelete}
            key={i}
            task={task}
          />
        );
      })}
    </div>
  );
}

export default Tasks;
