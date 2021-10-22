import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

interface Token {
  _id: string;
  iat: number;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')!.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;

    const authUser = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!authUser) throw new Error();

    req.authUser = authUser;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate!' });
  }
};

export default auth;
