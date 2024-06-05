import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

const Msg = styled.p`
  font-size: 22px;
  color: blue;
`;
const CreateTask = () => {
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
    const newTask = {};
    newTask.id = uuid();
    newTask.name = taskName;

    if (dueDateTime instanceof DateObject) {
      // newTask.dueDateTime = dateTime.toDate().getTime();
      newTask.dueDateTime = dueDateTime;
    }

    newTask.completed = completed;
    newTask.subtasks = subtasks;
    newTask.percentCompleted = 0;
    newTask.priority = priority;
    newTask.complexity = complexity;
    newTask.category = category;
    const newTasks = [...tasks, newTask];
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
      <h3 style={{ marginBottom: "10px" }}>CreateTask</h3>
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

export default CreateTask;
