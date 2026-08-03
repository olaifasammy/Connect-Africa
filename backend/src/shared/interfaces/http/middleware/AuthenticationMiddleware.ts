import { Request, Response, NextFunction } from 'express';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';
import { GetCurrentUserQueryHandler } from '@modules/auth/application/handlers/queries/GetCurrentUserQueryHandler';
import { GetCurrentUserQuery } from '@modules/auth/application/queries/GetCurrentUserQuery';

export class AuthenticationMiddleware {
  constructor(
    private readonly jwtProvider: IJwtProvider,
    private readonly getCurrentUserHandler: GetCurrentUserQueryHandler
  ) {}

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'Missing or invalid token' }] });
    }

    const token = authHeader.split(' ')[1];
    try {
      const userId = this.jwtProvider.verifyToken(token);
      const user = await this.getCurrentUserHandler.handle(new GetCurrentUserQuery(userId));
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'Invalid or expired token' }] });
    }
  };
}
