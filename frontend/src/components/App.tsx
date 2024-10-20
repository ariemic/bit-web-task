import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { ITask } from "../interfaces/task.interface";
import Input from "./Input";

const API_URL = "http://localhost:3000/tasks";

// const initialTasks: ITask[] = [
//   { id: 0, name: "Buy shorts", isDone: false },
//   { id: 1, name: "Buy apples", isDone: true },
//   { id: 2, name: "Take the dog for a walk", isDone: false },
// ];

export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskName, setTaskName] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const toggleStatus = async (id: number): Promise<void> => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task,
    );

    setTasks(updatedTasks);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDone: !updatedTasks.find((task) => task.id === id)?.isDone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      setTasks(tasks);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const handleAdd = async () => {
    if (taskName.trim()) {
      const newTask: Omit<ITask, "id"> = {
        // id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0, // This is not needed anymore
        name: taskName,
        isDone: false,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const createdTask = await response.json();

      setTasks((tasks) => [...tasks, createdTask]);
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
