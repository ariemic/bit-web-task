import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "test.db", // Specify the database file name
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
