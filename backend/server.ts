import express from 'express';
import dotenv from 'dotenv';
import 'colors';
import connectDB from './database/db';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => {
  const PORT = process.env.PORT || 5000;

  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
