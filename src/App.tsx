import { useState } from "react";
import TaskList from "./TaskList";
import { ITask } from "./task.interface";
import Input from "./Input";

const initialTasks: ITask[] = [
  { id: 0, name: "Buy shorts", isDone: false },
  { id: 1, name: "Buy apples", isDone: true },
  { id: 2, name: "Take the dog for a walk", isDone: false },
];

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [taskName, setTaskName] = useState<string>("");

  const toggleStatus = (id: number): void => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task,
      ),
    );
  };

  const handleDelete = (id: number): void => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const handleAdd = () => {
    if (taskName.trim()) {
      const newTask: ITask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
        name: taskName,
        isDone: false,
      };

      setTasks((tasks) => [...tasks, newTask]);
      setTaskName("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="font mt-3 text-4xl">Just do this</h1>
      <Input onAdd={handleAdd} taskName={taskName} setTaskName={setTaskName} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={toggleStatus} />
    </div>
  );
}
