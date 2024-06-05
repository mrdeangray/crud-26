import React, { useContext } from "react";
import { TaskContext } from "../context/TaskProvider";
import { Link } from "react-router-dom";
import { calcPercentCompleted } from "./util/calcPercentCompleted";

const Task = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  // const calcPercentCompleted = (subtasks) => {
  //   const percent =
  //     (subtasks.filter((s) => s.completed).length / subtasks.length) * 100;
  //   return Math.round(percent);
  // };

  const handleClick = (index) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) {
        t.subtasks[index].completed = !t.subtasks[index].completed;
        t.percentCompleted = calcPercentCompleted(t.subtasks);
      }
      return t;
    });
    setTasks(newTasks);
  };

  return (
    <div>
      <h2>{task.name}</h2>
      <h1>{task.percentCompleted}%</h1>
      <p style={{ color: "blue" }}>
        Past Due:
        {task.dueDateTime.toDate().getTime() < new Date().getTime()
          ? "Yes"
          : "No"}
      </p>
      {task.subtasks.map((subtask, index) => {
        return (
          <p
            key={index}
            style={{
              textDecoration: subtask.completed ? "line-through" : "none",
            }}
            onClick={() => handleClick(index)}
          >
            {subtask.name}
          </p>
        );
      })}
      <p>Category: {task.category}</p>
      <Link to={`/updatetask/${task.id}`}>
        <button>Update</button>
      </Link>
      <Link to={`/deletetask/${task.id}`}>
        <button>Delete</button>
      </Link>
    </div>
  );
};

export default Task;
