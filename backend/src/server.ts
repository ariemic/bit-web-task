import { AppDataSource } from "./config/data-source";
import taskRoutes from "./routes/taskRoutes";

import swaggerUi from "swagger-ui-express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import { resetDatabase } from "./utils/resetDatabase";
import { addTasks } from "./utils/addSomeDummyTasks";

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do API",
      version: "1.0.0",
    },

    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The unique identifier for a task",
            },
            name: {
              type: "string",
              description: "The name of the task",
            },
            isDone: {
              type: "boolean",
              description: "The status of the task",
            },
          },
          required: ["name", "isDone"],
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

AppDataSource.initialize()
  .then(async () => {
    console.log("Connected to the database");
    await resetDatabase();
    await addTasks();

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
