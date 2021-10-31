import { ObjectId } from 'mongodb';
import { Model, Schema, model } from 'mongoose';

export interface IBook {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  image: string;
  owner: ObjectId;
  isAvailable: boolean;
  isReturned: boolean;
  returnedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    returnedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Book = model<IBook>('Book', bookSchema);

export default Book;
