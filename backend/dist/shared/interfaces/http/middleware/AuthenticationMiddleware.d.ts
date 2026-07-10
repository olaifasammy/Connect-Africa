import { Request, Response, NextFunction } from 'express';
import { IJwtProvider } from '../../../../modules/auth/domain/interfaces/IJwtProvider';
import { GetCurrentUserQueryHandler } from '../../../../modules/auth/application/handlers/queries/GetCurrentUserQueryHandler';
export declare class AuthenticationMiddleware {
    private readonly jwtProvider;
    private readonly getCurrentUserHandler;
    constructor(jwtProvider: IJwtProvider, getCurrentUserHandler: GetCurrentUserQueryHandler);
    authenticate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
