import { AppDataSource } from "../config/data-source";

export async function resetDatabase() {
  const taskRepository = AppDataSource.getRepository("Task");
  await taskRepository.clear();

  await AppDataSource.query("DELETE FROM sqlite_sequence WHERE name = 'task'");
  console.log("Database reset");
}
