import { Router } from "express";
import { AppDataSource } from "../config/data-source";
import { Task } from "../entity/Task";
import { validate } from "class-validator";

const router = Router();
const taskRespository = AppDataSource.getRepository(Task);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await taskRespository.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a single task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
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

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               isDone:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task's name and status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isDone:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task's status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDone:
 *                 type: boolean
 *                 description: The new status of the task
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const task = await taskRespository.findOne({ where: { id: parseInt(id) } });
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

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
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
