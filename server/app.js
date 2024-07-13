import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.middleware.js';
import userRouter from './routes/user.routes.js';
import formRouter from './routes/form.routes.js';

configDotenv();
connectDB();

const app = express();
const port = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL;

// Configure CORS options
const corsOptions = {
  origin: CLIENT_URL, // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/forms', formRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
