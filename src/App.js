import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header.js";
import Tasks from "./components/Tasks.js";
import AddTask from "./components/AddTask.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async function getTasks() {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    })();
  }, []);

  ///Fetch Tasks from JSON server
  async function fetchTasks() {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn("Failed to fetch", e.message);
    }
  }

  async function fetchOneTask(id) {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn("Failed to fetch", e.message);
    }
  }

  // Functions
  function onShowForm() {
    setShowForm(!showForm);
  }

  async function addTask(task) {
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
    } catch (e) {
      console.warn(e.message);
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.warn(e.message);
    }
  }

  async function toggleReminder(id) {
    const fetchedTask = await fetchOneTask(id);
    const updatedTask = { ...fetchOneTask, reminder: !fetchedTask.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  }
  ////////

  return (
    <Router>
      <div className="container">
        <Header
          background={showForm ? "red" : "green"}
          text={showForm ? "Close" : "Add"}
          onShowForm={onShowForm}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showForm && <AddTask addTask={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  reminder={toggleReminder}
                  onDelete={deleteTask}
                  tasks={tasks}
                />
              ) : (
                <p>No tasks to show</p>
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
