import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth-route';
import githubRoutes from './routes/github-route';
import { errorMiddleware } from './middleware/error-middleware';

config();

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', githubRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 