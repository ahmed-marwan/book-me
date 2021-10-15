import mongoose from 'mongoose';

const borrowRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestedBooks: {
      type: [
        {
          title: { type: String, required: true },
          book: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book',
          },
        },
      ],
      validate: {
        validator(value: string | any[]) {
          return value.length <= 2;
        },
        message: 'You cannot request more than 2 books',
      },
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema);

export default BorrowRequest;
