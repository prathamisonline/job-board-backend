import express from 'express';
import jobRoutes from './routes/jobRoutes'; 
const app = express();
app.use(express.json()); 
app.use('/api', jobRoutes); 

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
export default app;