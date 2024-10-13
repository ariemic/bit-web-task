import { FaRegTrashAlt } from "react-icons/fa";
import { ITask } from "./task.interface";

export default function Task({
  task,
  onToggle,
  onDelete,
}: {
  task: ITask;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li key={task.id}>
      <div className="flex w-72 items-center justify-between">
        <div className="flex">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggle(task.id)}
          />
          <p className={task.isDone ? "line-through" : ""}>{task.name}</p>
        </div>
        <button onClick={() => onDelete(task.id)}>
          <FaRegTrashAlt color="red" />
        </button>
      </div>
    </li>
  );
}
