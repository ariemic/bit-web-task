import { ITask } from "./task.interface";
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
    <ul>
      {tasks.map((task) => (
        <Task task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
}