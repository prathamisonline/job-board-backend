import express from 'express';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - company
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the job
 *         title:
 *           type: string
 *           description: Job title
 *         company:
 *           type: string
 *           description: Company name
 *         location:
 *           type: string
 *           description: Job location
 *         salary:
 *           type: number
 *           description: Job salary
 *         description:
 *           type: string
 *           description: Job description
 *       example:
 *         id: 1
 *         title: Frontend Developer
 *         company: TechCorp
 *         location: New York, NY
 *         salary: 85000
 *         description: We are looking for a skilled Frontend Developer.
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
router.get('/', getJobs);

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: The created job
 */
router.post('/', createJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put('/:id', updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
router.delete('/:id', deleteJob);

export default router;
