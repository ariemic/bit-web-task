import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { validate } from "class-validator";

const router = Router();
const taskRespository = AppDataSource.getRepository(Task);

router.get("/", async (req, res) => {
  try {
    const tasks = await taskRespository.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskRespository.findOne(id);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching task" });
  }
});

router.post("/", async (req, res) => {
  const task = new Task();
  task.name = req.body.name;
  task.isDone = req.body.isDone;

  const errors = await validate(task);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const newTask = await taskRespository.save(task);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const task = await taskRespository.findOne(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.name = req.body.name;
  task.isDone = req.body.isDone;

  const errors = await validate(task);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  res.json(await taskRespository.save(task));
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const task = await taskRespository.findOne(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  try {
    task.isDone = isDone;
    await taskRespository.save(task);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error status of the task" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await taskRespository.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).jsons({ message: "Error deleting task" });
  }
});

export default router;
