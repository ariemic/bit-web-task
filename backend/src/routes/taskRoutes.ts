import { Router } from "express";
import { getRepository } from "typeorm";
import { Task } from "../entity/Task";
import { validate } from "class-validator";

const router = Router();

router.get("/", async (req, res) => {
  const task = await getRepository(Task).find();
  res.json(task);
});

router.post("/", async (req, res) => {
  const task = new Task();
  task.name = req.body.name;
  task.isDone = req.body.isDone;

  const errors = await validate(task);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const newTask = await getRepository(Task).save(task);
  res.status(201).json(newTask);
});

router.put("/:id", async (req, res) => {
  const task = await getRepository(Task).findOne(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.name = req.body.name;
  task.isDone = req.body.isDone;

  const errors = await validate(task);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }
  res.json(await getRepository(Task).save(task));
});

router.delete("/:id", async (req, res) => {
  const result = await getRepository(Task).delete(req.params.id);
  if (result.affected === 0) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.sendStatus(204);
});

export default router;
