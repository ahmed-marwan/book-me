import { ObjectId } from 'mongodb';
import { Model, Schema, model } from 'mongoose';

export interface IBorrowRequest {
  user: ObjectId;
  requestedBook: ObjectId;
  isDelivered: boolean;
  deliveredAt: Date;
  isReturned: boolean;
  returnedAt: Date;
}

const borrowRequestSchema = new Schema<IBorrowRequest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    requestedBook: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false,
    },
    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const BorrowRequest = model<IBorrowRequest>(
  'BorrowRequest',
  borrowRequestSchema
);

export default BorrowRequest;
