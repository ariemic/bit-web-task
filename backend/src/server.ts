import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import taskRoutes from "./routes/taskRoutes";
import { AppDataSource } from "./data-source";

const express = require("express");
const app = express();

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
