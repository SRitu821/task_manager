import "./App.css";
import Header from "./Components/Header";
import InputSection from "./Components/InputSection";
import Button from "./Components/CustomButton";
import Task from "./Components/Task";
import { useState } from "react";

function App() {
  const [add, setAdd] = useState(false);
  const [tasks, setTask] = useState([]);
  const [singleTask, setSingleTask] = useState("");
  const [singleDes, setSingleDes] = useState("");

  const handleInput = () => {
    setAdd(!add);
  };

  const handleTask = (event) => {
    setSingleTask(event.target.value);
  };

  const handleDes = (event) => {
    setSingleDes(event.target.value);
  };

  const addTask = () => {
    const id = tasks.length == 0 ? 1 : tasks.length + 1;
    const taskDetail = {
      id: id,
      task: singleTask,
      des: singleDes,
      complete: false,
    };
    setTask([...tasks, taskDetail]);
  };
  const deleteTask = (id) => {
    setTask(tasks.filter((t) => (
      t.id == id ? false : true
    ))
  );
  };
  const updateTask = (id) => {
    setTask(tasks.map((t) => (
      t.id == id ? {...t,complete:true}:t
    ))
  );
  };

  const clearInput = () => {
   setSingleTask('');
   setSingleDes('');
  };

  return (
    <div className="main">
      <div className="InputSection">
        <Header handleInput={handleInput} />
        {add == true ? (
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
            <div className="btn-Wrapper">
              <Button bg="#4CC9FE" color="white" name="Save" click={addTask} />
              <Button bg="#CD1818" color="white" name="Cancle" click={clearInput} />
            </div>
          </>
        ) : null}
      </div>

      <div className="TaskSection">
        {tasks.map((t) => (
          <Task title={t.task} des={t.des} id={t.id} key={t.id} delete={()=> deleteTask(t.id)}
          update = {()=> updateTask(t.id)} complete={t.complete} />
        ))}
      </div>
    </div>
  );
}

export default App;
