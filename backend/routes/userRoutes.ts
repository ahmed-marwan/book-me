import express, { Request, Response } from 'express';
import User from '../models/userModel';
import auth from '../middleware/auth';

const router = express.Router();

/**
 * @desc   Register new user
 * @route  POST /api/users
 * @access Public
 */
router.post('/', async (req: Request, res: Response) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();

    const token = await newUser.generateAuthToken();
    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @desc   Login user
 * @route  POST /api/users/login
 * @access Public
 */
router.post(
  '/login',
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    const { email, password } = req.body;

    try {
      const loggedinUser = await User.findByCredentials(email, password);
      const token = await loggedinUser.generateAuthToken();

      res.send({
        _id: loggedinUser._id,
        name: loggedinUser.name,
        email: loggedinUser.email,
        token,
      });
    } catch (error) {
      res.status(400).send();
    }
  }
);

/**
 * @desc   Read user profile
 * @route  GET /api/users/profile
 * @access Private
 */
router.get('/profile', auth, (req, res) => {
  res.send(req.authUser);
});

/**
 * @desc   Update user profile
 * @route  PATCH /api/users/profile
 * @access Private
 */
router.patch(
  '/profile',
  auth,
  async (
    req: Request<{}, {}, { name: string; email: string; password: string }>,
    res: Response
  ) => {
    const updatedUser = req.authUser;
    const { name, email, password } = req.body;

    try {
      updatedUser.name = name || updatedUser.name;
      updatedUser.email = email || updatedUser.email;
      if (password) {
        updatedUser.password = password;
      }

      await updatedUser.save();

      res.send(updatedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
