// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import jobRoutes from './routes/jobRoutes';

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api', jobRoutes);

// export default app;
import express from 'express';
import jobRoutes from './routes/jobRoutes'; // Adjust the path as needed

const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', jobRoutes); // Mount the job routes on /api

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
export default app;