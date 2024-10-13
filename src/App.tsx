import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Task {
  id: number;
  name: string;
  isDone: boolean;
}

const initialTasks: Task[] = [
  { id: 0, name: "Buy shorts", isDone: false },
  { id: 1, name: "Buy apples", isDone: true },
  { id: 2, name: "Take the dog for a walk", isDone: false },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
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
      const newTask: Task = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
        name: taskName,
        isDone: false,
      };

      setTasks((tasks) => [...tasks, newTask]);
      setTaskName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="font mt-3 text-4xl">Just do this</h1>

      <div className="relative flex w-96 items-center px-2 py-1">
        <input
          className="w-full rounded-full px-2 py-1 text-xl placeholder-stone-800 ring-4"
          placeholder="What do you need to do?"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button
          className="absolute right-0 rounded-e-full bg-blue-400 px-2 py-1 text-lg font-semibold uppercase text-stone-50"
          onClick={handleAdd}
        >
          add
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="flex w-72 items-center justify-between">
              <div className="flex">
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => toggleStatus(task.id)}
                />
                <p>{task.name}</p>
              </div>
              <button onClick={() => handleDelete(task.id)}>
                <FaRegTrashAlt color="red" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
