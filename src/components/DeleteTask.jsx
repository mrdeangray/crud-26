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
const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);

    setTaskName(curr.name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const handleDelete = () => {
    const newTasks = tasks.filter(task=>task.id!==id)

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
      <h3 style={{ marginBottom: "10px" }}>DeleteTask: {taskName}</h3>



      <button onClick={handleDelete}>Delete: {taskName}</button>
      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};


export default DeleteTask