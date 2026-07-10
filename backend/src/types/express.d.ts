import { IUser } from '@modules/auth/domain/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
