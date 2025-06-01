import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const formatTime12Hr = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleAddTask = () => {
    if (task.trim() === "") return alert("Please enter a task name");
    if (!date) return alert("Please select a date");
    if (!time) return alert("Please select a time");

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        priority,
        date,
        time,
      },
    ]);

    setTask("");
    setPriority("Medium");
    setDate("");
    setTime("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (filter === "Completed") {
      filtered = filtered.filter((t) => t.completed);
    } else if (filter === "Incomplete") {
      filtered = filtered.filter((t) => !t.completed);
    }

    if (sortBy === "Date") {
      filtered.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortBy === "Priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      filtered.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (sortBy === "Time") {
      filtered.sort((a, b) => a.time.localeCompare(b.time));
    }

    return filtered;
  };

  return (
    <div className="app-wrapper">
      <div className="calendar-box">
        <div className="calendar-header">
          <h2>To-Do Calendar</h2>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="task-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <div className="sort-filter-bar">
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="">Sort By</option>
            <option value="Date">Date</option>
            <option value="Time">Time</option>
            <option value="Priority">Priority</option>
          </select>
        </div>

        <ul className="task-list">
          {getFilteredTasks().map((t) => (
            <li key={t.id} className={t.completed ? "completed-task" : ""}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleComplete(t.id)}
                />
                <span className="checkmark"></span>
              </label>
              <span className="task-text">{t.text}</span>
              {t.completed && (
                <span className="completed-label">Completed</span>
              )}
              <span className="task-details">
                📅 {t.date} 🕐 {formatTime12Hr(t.time)} | ⚡ {t.priority}
              </span>
              <button className="delete-btn" onClick={() => handleDeleteTask(t.id)}>
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;

