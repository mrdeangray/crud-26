import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import styled from "styled-components";

const Msg = styled.p`
  font-size: 22px;
  color: blue;
`;
const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [dueDateTime, setDueDateTime] = useState(new DateObject());
  const [subtasks, setSubtasks] = useState([]);
  const [priority, setPriority] = useState("2");
  const [complexity, setComplexity] = useState("2");
  const [completed, setCompleted] = useState(false);
  const [category, setCatgegory] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currTask, setCurrTask] = useState({});

  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);
    setCurrTask(curr);
    console.log(curr.name);
    setTaskName(curr.name);
    setSubtasks(curr.subtasks);
    // console.log(curr.subtasks);
    setPriority(curr.priority);
    setComplexity(curr.complexity);
    setCatgegory(curr.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, index) => {
    const newSubtaks = [...subtasks];
    newSubtaks[index].name = event.target.value;
    setSubtasks(newSubtaks);
  };
  const handleRemove = (index) => {
    const newSubtaks = [...subtasks];
    newSubtaks.splice(index, 1);
    setSubtasks(newSubtaks);
  };

  const handleAdd = () => {
    const newSubtaks = [...subtasks, { name: "", completed: false }];
    setSubtasks(newSubtaks);
  };

  const handleSubmit = () => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.name = taskName;

        if (dueDateTime instanceof DateObject) {
          task.dueDateTime = dueDateTime;
        }

        task.completed = completed;
        task.subtasks = subtasks;
        task.percentCompleted = 0;
        task.priority = priority;
        task.complexity = complexity;
        task.category = category;
      }

      return task;
    });

    setTasks(newTasks);
    localStorage.setItem("crud-26", JSON.stringify(newTasks));
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      navigate(`/readtasks`);
    }, 2000);
  };

  return (
    <div>
      <Link to={`/readtasks`}>Back</Link>
      <h3 style={{ marginBottom: "10px" }}>UpdateTask: {taskName}</h3>
      <div className="form">
        <input
          type="text"
          placeholder="Task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <DatePicker
          value={dueDateTime}
          onChange={setDueDateTime}
          format="MM/DD/YYYY HH:mm:ss"
          plugins={[<TimePicker position="bottom" />]}
        />

        <div className="subtasks">
          {subtasks.map((subtask, index) => {
            return (
              <div key={index} className="subtask">
                <input
                  type="text"
                  placeholder="Subtask"
                  value={subtask.name}
                  onChange={(e) => handleChange(e, index)}
                />
                <button onClick={() => handleRemove(index)}>Remove</button>
              </div>
            );
          })}
          <button onClick={handleAdd}>Add</button>
        </div>

        <div>
          <span>Priority:</span>
          {["1", "2", "3"].map((value, index) => {
            return (
              <label key={index} htmlFor={value}>
                <input
                  type="radio"
                  id={value}
                  name="priority"
                  value={value}
                  checked={priority === value}
                  onChange={(e) => setPriority(e.target.value)}
                />
                {value}
              </label>
            );
          })}
        </div>
        <div>
          <span>Complexity: </span>
          {["1", "2", "3"].map((value, index) => {
            return (
              <label key={index} htmlFor={value}>
                <input
                  type="radio"
                  value={value}
                  checked={complexity === value}
                  onChange={(e) => setComplexity(e.target.value)}
                />
                {value}
              </label>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCatgegory(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};

export default UpdateTask;
