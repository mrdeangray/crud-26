import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import Task from "./Task";

const ReadTasks = () => {
  const { tasks } = useContext(TaskContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedSortOption, setSelectedSortOption] = useState("ascending");

  const sortOptions = {
    ascending: (a, b) => a.name.localeCompare(b.name),
    descending: (a, b) => b.name.localeCompare(a.name),
    score: (a, b) => a.name - b.name,
  };
  // const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(() => {
    const cat = [...new Set(tasks.map((task) => task.category.toLowerCase()))];
    setCategories(cat);
  }, []);

  return (
    <div>
      <h3>ReadTasks</h3>
      <Link to={`/createtask`}>
        <button>Create Task</button>
      </Link>

      <select
        name="sortOptions"
        id="sortOption-select"
        value={selectedSortOption}
        onChange={(e) => {
          setSelectedSortOption(e.target.value);
          console.log(sortOptions[selectedSortOption])
          console.log(e.target.value);
        }}
      >
        <option defaultValue="Sort">Sort</option>
        {Object.keys(sortOptions).map((sortOption, index) => {
          return (
            <option key={index} value={sortOption}>
              {sortOption}
            </option>
          );
        })}
      </select>




      <select
        name="categories"
        id="category-select"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option defaultValue="Category">Category</option>
        {categories.map((category, index) => {
          return (
            <option key={index} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      <div className="read-tasks">
        {(selectedCategory === "Category"
          ? tasks
          : tasks.filter((task) => task.category === selectedCategory)
        ).sort(sortOptions[selectedSortOption]).map((task) => {
          // (a, b) => a.name - b.name
          // sortOptions[selectedSortOption]
          return (
            <div key={task.id} className="box">
              <Task task={task} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadTasks;
