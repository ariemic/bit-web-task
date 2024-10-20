import { AppDataSource } from "./data-source";
import { Task } from "./entity/Task";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new task into the database...");

    const task = new Task();
    task.name = "Do the laundry";
    task.isDone = false;
    
    await AppDataSource.manager.save(task);
    console.log("Saved a new task with id: " + task.id);

    console.log("Loading tasks from the database...");
    const tasks = await AppDataSource.manager.find(Task);
    console.log("Loaded tasks: ", tasks);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
