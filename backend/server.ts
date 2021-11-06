import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import 'colors';
import connectDB from './database/db';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import borrowRequestsRoutes from './routes/borrowRequestRouter';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/borrow-requests', borrowRequestsRoutes);

const __mydirname = path.resolve();
app.use('/uploads', express.static(path.join(__mydirname, '/uploads')));

app.listen(5000, () => {
  const PORT = process.env.PORT || 5000;

  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
