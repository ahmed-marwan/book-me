import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'colors';
import connectDB from './database/db';
import { users } from './data/users';
import { books } from './data/books';
import User from './models/userModel';
import Book from './models/bookModel';
import BorrowRequest from './models/borrowRequestModel';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await BorrowRequest.deleteMany();

    const createdUsers = await User.insertMany(users);

    const sampleBooks = books.map((book) => {
      let randomNum = Math.floor(Math.random() * 2);

      return {
        ...book,
        owner: createdUsers[randomNum]._id,
      };
    });

    await Book.insertMany(sampleBooks);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await BorrowRequest.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}.red.inverse`);
    process.exit(1);
  }
};

process.argv[2] === '-d' ? destroyData() : importData();
