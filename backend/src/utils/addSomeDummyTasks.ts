import { AppDataSource } from "../config/data-source";
import { Task } from "../entity/Task";

export async function addTasks() {
  const tasks = [
    {
      title: "Take a dog for a walk",
      isDone: false,
    },
    {
      title: "Buy groceries",
      isDone: false,
    },
    {
      title: "Do laundry",
      isDone: true,
    },
  ];

  tasks.forEach(async (task) => {
    const newTask = new Task();
    task.title = task.title;
    task.isDone = task.isDone;
    await AppDataSource.getRepository("Task").save(task);
  });
}
