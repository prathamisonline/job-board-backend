import app from './app';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger/swagger';
dotenv.config();

const PORT = process.env.PORT || 3000;
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
