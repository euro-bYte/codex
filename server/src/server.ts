import dotenv from 'dotenv';
import { app } from './app';

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
