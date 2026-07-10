import { Request, Response } from 'express';
import { BaseController } from '@shared/interfaces/http/controllers/BaseController';
import { LoginCommand } from '@modules/auth/application/commands/LoginCommand';
import { LogoutCommand, LogoutCommandHandler } from '@modules/auth/application/handlers/LogoutCommandHandler';
import { RefreshCommand, RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { logger } from '@shared/logger/Logger';
import { RegisterUserCommand } from '@modules/auth/application/commands/RegisterUserCommand';
import { ResetPasswordCommandHandler } from '@modules/auth/application/handlers/ResetPasswordCommandHandler';
import { ResetPasswordCommand } from '@modules/auth/application/commands/ResetPasswordCommand';

export class AuthController extends BaseController {
  constructor(
    private loginHandler: ICommandHandler<LoginCommand, string>,
    private logoutHandler: LogoutCommandHandler,
    private refreshHandler: RefreshCommandHandler,
    private registerUserHandler: ICommandHandler<RegisterUserCommand, void>,
    private resetPasswordHandler: ResetPasswordCommandHandler
  ) {
    super();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
        logger.info('Register request received', { email: req.body.email });
        const { email, password } = req.body;
        await this.registerUserHandler.handle(new RegisterUserCommand(email, password));
        res.status(201).json({ success: true });
    } catch (error: any) {
        logger.error('Register error', { error: error.message });
        this.handleError(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const token = await this.loginHandler.handle(new LoginCommand(email, password));
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        
        res.status(200).json({ success: true, data: { token } });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || '';
    const userId = (req as any).user?.id || '';
    await this.logoutHandler.handle(new LogoutCommand(token, userId));
    
    res.clearCookie('token');
    res.status(204).send();
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    const userId = (req as any).user?.id || '';
    const token = await this.refreshHandler.handle(new RefreshCommand(refreshToken, userId));
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour
    });

    res.status(200).json({ token });
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
        const { email, newPassword } = req.body;
        const ipAddress = req.ip || '';
        await this.resetPasswordHandler.handle(new ResetPasswordCommand(email, newPassword, ipAddress));
        
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  protected async execute(req: Request, res: Response): Promise<void> {
    // Legacy mapping or specific endpoint logic
  }
}
