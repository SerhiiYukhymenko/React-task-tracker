import React, { useState } from "react";

function AddTask({ addTask }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(false);

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!text) {
      alert("Add Taks");
      return;
    }
    addTask({ text: text, time: time, reminder: reminder });
    setText("");
    setTime("");
    setReminder(false);
  }

  return (
    <form className="add-form" onSubmit={onSubmitHandler}>
      <div className="form-control">
        <label htmlFor="task">Task</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Task"
          type="text"
          name="task"
          id="task"
        />
      </div>
      <div className="form-control">
        <label htmlFor="date">Day & Time</label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Add Day & Time"
          type="text"
          name="date"
          id="date"
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          type="checkbox"
          checked={reminder}
          name="reminder"
          id="reminder"
        />
      </div>
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
}
export default AddTask;
