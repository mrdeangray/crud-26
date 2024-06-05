import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  localStorage.clear();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("crud-26")) || [];
    setTasks(savedTasks);
  }, []);
  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
