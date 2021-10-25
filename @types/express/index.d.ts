import { IUser } from '../../backend/models/userModel';

declare global {
  namespace Express {
    interface Request {
      authUser: IUser;
    }
  }
}
