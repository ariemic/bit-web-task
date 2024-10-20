import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";

import swaggerUi from "swagger-ui-express";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";

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
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
