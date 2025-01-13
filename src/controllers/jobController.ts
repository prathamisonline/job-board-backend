import { Request, Response, NextFunction } from 'express';
import pool from '../database/connection';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, company, location, salary, description } = req.body;

    if (!title || !company || !location || !salary || !description) {
       res.status(400).json({ error: 'All fields are required' });
    }

    console.log('Request payload:', req.body); 
    const [result]: any = await pool.execute(
      'INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)',
      [title, company, location, salary, description]
    );

    res.status(201).json({ message: 'Job created successfully', jobId: result.insertId });
  } catch (err) {
    console.error('Error creating job:', err); 
    res.status(500).json({ error: 'Error creating job' });
  }
};



export const getJobs = async (req: Request, res: Response) => {
  try {
    const [jobs] = await pool.execute('SELECT * FROM jobs');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching jobs' });
  }
};

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
}

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const [jobs]: [Job[]] = await pool.execute('SELECT * FROM jobs WHERE id = ?', [id]) as unknown as [Job[]];

    if (jobs.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return; 
    }

    res.json(jobs[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching job' });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, company, location, salary, description } = req.body;

    const [result]: any[] = await pool.execute(
      'UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?',
      [title, company, location, salary, description, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Error updating job' });
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const jobId = req.params.id;

    // Check if the job exists
    const [checkResult]: any = await pool.execute(
      'SELECT id FROM jobs WHERE id = ?',
      [jobId]
    );

    if (checkResult.length === 0) {
      res.status(404).json({ error: `Job with ID ${jobId} not found.` });
      return; // Ensure the function ends here
    }

    // Delete the job
    const [deleteResult]: any = await pool.execute(
      'DELETE FROM jobs WHERE id = ?',
      [jobId]
    );

    if (deleteResult.affectedRows === 0) {
      res
        .status(500)
        .json({ error: `Failed to delete the job with ID ${jobId}.` });
      return; 
    }

    res
      .status(200)
      .json({ message: `Job with ID ${jobId} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting job:', error);
    next(error);
  }
};