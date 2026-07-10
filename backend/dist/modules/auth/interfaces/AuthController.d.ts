import { Request, Response } from 'express';
import { BaseController } from '../../../shared/interfaces/http/controllers/BaseController';
import { LoginCommand } from '../../auth/application/commands/LoginCommand';
import { LogoutCommandHandler } from '../../auth/application/handlers/LogoutCommandHandler';
import { RefreshCommandHandler } from '../../auth/application/handlers/RefreshCommandHandler';
import { ICommandHandler } from '../../../shared/application/handlers/ICommandHandler';
import { RegisterUserCommand } from '../../auth/application/commands/RegisterUserCommand';
import { ResetPasswordCommandHandler } from '../../auth/application/handlers/ResetPasswordCommandHandler';
export declare class AuthController extends BaseController {
    private loginHandler;
    private logoutHandler;
    private refreshHandler;
    private registerUserHandler;
    private resetPasswordHandler;
    constructor(loginHandler: ICommandHandler<LoginCommand, string>, logoutHandler: LogoutCommandHandler, refreshHandler: RefreshCommandHandler, registerUserHandler: ICommandHandler<RegisterUserCommand, void>, resetPasswordHandler: ResetPasswordCommandHandler);
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    refresh(req: Request, res: Response): Promise<void>;
    resetPassword(req: Request, res: Response): Promise<void>;
    protected execute(req: Request, res: Response): Promise<void>;
}
