import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import BorrowRequest from '../models/borrowRequestModel';

const router = express.Router();

/**
 * @desc   Create a borrow request
 * @route  POST /api/borrow-requests
 * @access Private
 */
router.post('/', auth, async (req: Request, res: Response) => {
  const newBorrowRequest = new BorrowRequest({
    ...req.body,
    user: req.authUser._id,
  });

  try {
    await newBorrowRequest.save();
    res.status(201).send(newBorrowRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
