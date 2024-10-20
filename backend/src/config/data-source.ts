import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entity/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "test.db",
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});
