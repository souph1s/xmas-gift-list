import { Header } from "./components/Header/Header";
import { AddTask } from "./components/AddTask/AddTask";
import "./global.css";
import { Tasks } from "./components/Tasks/Tasks";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  return (
    <>
      <Header />
      <AddTask onAddTask={handleAddTask} />
      <Tasks taskItems={tasks} />
    </>
  );
}

export default App;
