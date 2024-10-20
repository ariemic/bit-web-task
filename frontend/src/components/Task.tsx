import { FaRegTrashAlt } from "react-icons/fa";
import { ITask } from "../interfaces/task.interface";

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
    <li key={task.id} className="mb-3 max-w-96 sm:mb-2">
      <div className="flex max-w-60 items-center justify-between sm:min-w-72 sm:max-w-96">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-3 h-6 w-6 sm:h-5 sm:w-5"
            checked={task.isDone}
            onChange={() => onToggle(task.id)}
          />
          <p
            className={`${task.isDone ? "line-through" : ""} max-w-40 truncate text-base sm:max-w-80 sm:text-lg lg:text-xl`}
          >
            {task.name}
          </p>
        </div>
        <button onClick={() => onDelete(task.id)} className="ml-2">
          <FaRegTrashAlt color="red" className="sm:1-5 h-6 w-6 sm:h-5" />
        </button>
      </div>
    </li>
  );
}
