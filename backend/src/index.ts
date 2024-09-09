import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
dotenv.config({
  path: '.env',
});

const app = express();
const port = 4000;
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
