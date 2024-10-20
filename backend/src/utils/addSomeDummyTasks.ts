import { AppDataSource } from "../config/data-source";
import { Task } from "../entity/Task";

export async function addTasks() {
  const tasks = [
    {
      name: "Take a dog for a walk",
      isDone: false,
    },
    {
      name: "Buy groceries",
      isDone: false,
    },
    {
      name: "Do laundry",
      isDone: true,
    },
  ];

  try {
    const taskRepository = AppDataSource.getRepository(Task);

    for (const task of tasks) {
      const newTask = new Task();
      newTask.name = task.name;
      newTask.isDone = task.isDone;
      await taskRepository.save(newTask);
    }
  } catch (error) {
    console.error(error);
  }
}
