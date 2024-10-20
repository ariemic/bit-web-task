import { ITask } from "../interfaces/task.interface";
import Task from "./Task";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}: {
  tasks: ITask[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <ul className="mb-5">
      {tasks.map((task) => (
        <Task
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          key={task.id}
        />
      ))}
    </ul>
  );
}
