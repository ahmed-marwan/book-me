import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
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

const Book = mongoose.model('Book', bookSchema);

export default Book;
