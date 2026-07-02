import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { LoginCommand } from '@application/commands/auth/LoginCommand';
import { LogoutCommand, LogoutCommandHandler } from '@application/handlers/auth/LogoutCommandHandler';
import { RefreshCommand, RefreshCommandHandler } from '@application/handlers/auth/RefreshCommandHandler';
import { ICommandHandler } from '@application/handlers/ICommandHandler';

export class AuthController extends BaseController {
  constructor(
    private loginHandler: ICommandHandler<LoginCommand, string>,
    private logoutHandler: LogoutCommandHandler,
    private refreshHandler: RefreshCommandHandler
  ) {
    super();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await this.loginHandler.handle(new LoginCommand(email, password));
    res.status(200).json({ token });
  }

  async logout(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1] || '';
    await this.logoutHandler.handle(new LogoutCommand(token));
    res.status(204).send();
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    const token = await this.refreshHandler.handle(new RefreshCommand(refreshToken));
    res.status(200).json({ token });
  }

  protected async execute(req: Request, res: Response): Promise<void> {
    // Legacy mapping or specific endpoint logic
  }
}
