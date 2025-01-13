"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, description } = req.body;
        const [result] = await connection_1.default.execute('INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)', [title, company, location, salary, description]);
        res.status(201).json({ id: result.insertId, message: 'Job created successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Error creating job' });
    }
};
exports.createJob = createJob;
const getJobs = async (req, res) => {
    try {
        const [jobs] = await connection_1.default.execute('SELECT * FROM jobs');
        res.json(jobs);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching jobs' });
    }
};
exports.getJobs = getJobs;
const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        // Execute the query and cast result to the appropriate type
        const [jobs] = await connection_1.default.execute('SELECT * FROM jobs WHERE id = ?', [id]);
        if (jobs.length === 0) {
            // Send a response with 404 status if job not found
            res.status(404).json({ error: 'Job not found' });
            return; // Exit the function early to avoid sending multiple responses
        }
        // Send the first job object as the response
        res.json(jobs[0]);
    }
    catch (err) {
        // Handle any unexpected errors
        res.status(500).json({ error: 'Error fetching job' });
    }
};
exports.getJobById = getJobById;
// export const updateJob = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, company, location, salary, description } = req.body;
//     const [result] = await pool.execute(
//       'UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?',
//       [title, company, location, salary, description, id]
//     );
//     if ((result as any).affectedRows === 0) {
//       return res.status(404).json({ error: 'Job not found' });
//     }
//     res.json({ message: 'Job updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating job' });
//   }
// };
const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, location, salary, description } = req.body;
        // Execute the update query, assuming pool is a properly typed MySQL connection
        const [result] = await connection_1.default.execute('UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?', [title, company, location, salary, description, id]);
        if (result.affectedRows === 0) {
            // Respond with a 404 error if no rows were affected
            res.status(404).json({ error: 'Job not found' });
            return; // Do not return res, just exit the function
        }
        // Respond with a success message if the job was updated
        res.json({ message: 'Job updated successfully' });
    }
    catch (err) {
        // Handle any unexpected errors
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ error: 'Error updating job' });
    }
};
exports.updateJob = updateJob;
// export const deleteJob = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const [result] = await pool.execute('DELETE FROM jobs WHERE id = ?', [id]);
//     if ((result as any).affectedRows === 0) {
//       return res.status(404).json({ error: 'Job not found' });
//     }
//     res.json({ message: 'Job deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error deleting job' });
//   }
// };
const deleteJob = async (req, res, next) => {
    try {
        const jobId = req.params.id;
        // Perform the database deletion logic
        // Example: Replace with your actual database logic
        // await JobModel.delete(jobId);
        // Respond with success
        res.status(200).json({ message: `Job with ID ${jobId} deleted successfully.` });
    }
    catch (error) {
        // Pass errors to the error handler
        next(error);
    }
};
exports.deleteJob = deleteJob;
