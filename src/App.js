import "./App.css";
import Header from "./Components/Header";
import InputSection from "./Components/InputSection";
import Button from "./Components/CustomButton";
import Task from "./Components/Task";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [add, setAdd] = useState(false);
  const [singleTask, setSingleTask] = useState("");
  const [singleDes, setSingleDes] = useState("");
  const [priority, setPriority] = useState("Low");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("none");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInput = () => {
    setAdd(!add);
  };

  const handleTask = (event) => {
    setSingleTask(event.target.value);
  };

  const handleDes = (event) => {
    setSingleDes(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (event) => {
    setSortCriteria(event.target.value);
  };

  const addTask = () => {
    const id = tasks.length === 0 ? 1 : tasks.length + 1;
    const taskDetail = {
      id: id,
      task: singleTask,
      des: singleDes,
      complete: false,
      priority: priority,
    };
    setTask([...tasks, taskDetail]);
    clearInput();
  };

  const deleteTask = (id) => {
    setTask(tasks.filter((t) => t.id !== id));
  };

  const updateTask = (id) => {
    setTask(tasks.map((t) => (t.id === id ? { ...t, complete: true } : t)));
  };

  const clearInput = () => {
    setSingleTask("");
    setSingleDes("");
    setPriority("Low");
  };

  const sortTasks = (tasksToSort) => {
    switch (sortCriteria) {
      case "priority":
        return tasksToSort.sort((a, b) => {
          const priorityLevels = { Low: 1, Medium: 2, High: 3 };
          return priorityLevels[b.priority] - priorityLevels[a.priority];
        });
      case "completed":
        return tasksToSort.sort(
          (a, b) => Number(b.complete) - Number(a.complete)
        );
      default:
        return tasksToSort;
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = sortTasks([...filteredTasks]);

  return (
    <div className="main">
      <div className="InputSection">
        <Header handleInput={handleInput} />
        {add === true ? (
          <>
            <InputSection
              value={singleTask}
              label="Task"
              placeHolder="Enter Task"
              change={handleTask}
            />
            <InputSection
              value={singleDes}
              label="Description"
              placeHolder="Enter Description"
              change={handleDes}
            />

            <div className="InputWrapper">
              <label>Priority</label>
              <select
                value={priority}
                className="inputForm"
                onChange={handlePriority}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="btn-Wrapper">
              <Button bg="#4CC9FE" color="white" name="Save" click={addTask} />
              <Button
                bg="#CD1818"
                color="white"
                name="Cancel"
                click={clearInput}
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="searchSection">
        <InputSection
          value={searchQuery}
          label="Search Tasks"
          placeHolder="Search by Task Title"
          change={handleSearch}
        />
      </div>

      <div className="sortSection">
        <label>Sort by:</label>
        <select
          value={sortCriteria}
          onChange={handleSort}
          className="inputForm"
        >
          <option value="none">None</option>
          <option value="priority">Priority</option>
          <option value="completed">Completed Status</option>
        </select>
      </div>

      <div className="TaskSection">
        {sortedTasks.map((t) => (
          <Task
            title={t.task}
            des={t.des}
            id={t.id}
            key={t.id}
            delete={() => deleteTask(t.id)}
            update={() => updateTask(t.id)}
            complete={t.complete}
            priority={t.priority}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
