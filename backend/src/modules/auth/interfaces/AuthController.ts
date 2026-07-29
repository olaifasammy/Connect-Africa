import { Request, Response } from 'express';
import { BaseController } from '@shared/interfaces/http/controllers/BaseController';
import { LoginCommand } from '@modules/auth/application/commands/LoginCommand';
import { LogoutCommand, LogoutCommandHandler } from '@modules/auth/application/handlers/LogoutCommandHandler';
import { RefreshCommand, RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';
import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { logger } from '@shared/logger/Logger';
import { RegisterUserCommand } from '@modules/auth/application/commands/RegisterUserCommand';
import { ResetPasswordCommandHandler } from '@modules/auth/application/handlers/ResetPasswordCommandHandler';
import { VerifyEmailCommandHandler } from '@modules/auth/application/handlers/VerifyEmailCommandHandler';
import { UpdateProfileCommandHandler } from '@modules/auth/application/handlers/UpdateProfileCommandHandler';
import { BanUserCommandHandler } from '@modules/auth/application/handlers/BanUserCommandHandler';
import { SuspendUserCommandHandler } from '@modules/auth/application/handlers/SuspendUserCommandHandler';
import { RestoreAccountCommandHandler } from '@modules/auth/application/handlers/RestoreAccountCommandHandler';
import { AssignRoleCommandHandler } from '@modules/auth/application/handlers/AssignRoleCommandHandler';
import { RemoveRoleCommandHandler } from '@modules/auth/application/handlers/RemoveRoleCommandHandler';
import { DisableAccountCommandHandler } from '@modules/auth/application/handlers/DisableAccountCommandHandler';
import { ListUsersQueryHandler } from '@modules/auth/application/handlers/queries/ListUsersQueryHandler';
import { SearchUsersQueryHandler } from '@modules/auth/application/handlers/queries/SearchUsersQueryHandler';
import { ActivateAccountCommandHandler } from '@modules/auth/application/handlers/ActivateAccountCommandHandler';
import { ChangePasswordCommandHandler } from '@modules/auth/application/handlers/ChangePasswordCommandHandler';
import { DeleteAccountCommandHandler } from '@modules/auth/application/handlers/DeleteAccountCommandHandler';
import { ChangeEmailCommandHandler } from '@modules/auth/application/handlers/ChangeEmailCommandHandler';
import { UnbanUserCommandHandler } from '@modules/auth/application/handlers/UnbanUserCommandHandler';
import { EnableMfaCommandHandler } from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';
import { ListUserSessionsQueryHandler } from '@modules/auth/application/handlers/queries/ListUserSessionsQueryHandler';
import { RevokeAllUserSessionsCommandHandler } from '@modules/auth/application/handlers/RevokeAllUserSessionsCommandHandler';
import { UnlockUserCommandHandler } from '@modules/auth/application/handlers/UnlockUserCommandHandler';
import { EnableAccountCommandHandler } from '@modules/auth/application/handlers/EnableAccountCommandHandler';
import { RevokeSessionCommandHandler } from '@modules/auth/application/handlers/RevokeSessionCommandHandler';
import { ResetPasswordCommand } from '@modules/auth/application/commands/ResetPasswordCommand';
import { VerifyEmailCommand } from '@modules/auth/application/commands/VerifyEmailCommand';
import { UpdateProfileCommand } from '@modules/auth/application/commands/UpdateProfileCommand';
import { BanUserCommand } from '@modules/auth/application/commands/BanUserCommand';
import { SuspendUserCommand } from '@modules/auth/application/commands/SuspendUserCommand';
import { RestoreAccountCommand } from '@modules/auth/application/commands/RestoreAccountCommand';
import { AssignRoleCommand } from '@modules/auth/application/commands/AssignRoleCommand';
import { RemoveRoleCommand } from '@modules/auth/application/commands/RemoveRoleCommand';
import { DisableAccountCommand } from '@modules/auth/application/commands/DisableAccountCommand';
import { UnlockUserCommand } from '@modules/auth/application/commands/UnlockUserCommand';
import { EnableAccountCommand } from '@modules/auth/application/commands/EnableAccountCommand';
import { RevokeSessionCommand } from '@modules/auth/application/commands/RevokeSessionCommand';
import { ListUsersQuery } from '@modules/auth/application/queries/ListUsersQuery';
import { SearchUsersQuery } from '@modules/auth/application/queries/SearchUsersQuery';
import { ListUserSessionsQuery } from '@modules/auth/application/queries/ListUserSessionsQuery';
import { RevokeAllUserSessionsCommand } from '@modules/auth/application/commands/RevokeAllUserSessionsCommand';
import { ActivateAccountCommand } from '@modules/auth/application/commands/ActivateAccountCommand';
import { ChangePasswordCommand } from '@modules/auth/application/commands/ChangePasswordCommand';
import { DeleteAccountCommand } from '@modules/auth/application/commands/DeleteAccountCommand';
import { ChangeEmailCommand } from '@modules/auth/application/commands/ChangeEmailCommand';
import { UnbanUserCommand } from '@modules/auth/application/commands/UnbanUserCommand';
import { EnableMfaCommand } from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';

export class AuthController extends BaseController {
  constructor(
    private loginHandler: ICommandHandler<LoginCommand, string>,
    private logoutHandler: LogoutCommandHandler,
    private refreshHandler: RefreshCommandHandler,
    private registerUserHandler: ICommandHandler<RegisterUserCommand, void>,
    private resetPasswordHandler: ResetPasswordCommandHandler,
    private verifyEmailHandler: VerifyEmailCommandHandler,
    private updateProfileHandler: UpdateProfileCommandHandler,
    private banUserHandler: BanUserCommandHandler,
    private suspendUserHandler: SuspendUserCommandHandler,
    private restoreUserHandler: RestoreAccountCommandHandler,
    private assignRoleHandler: AssignRoleCommandHandler,
    private removeRoleHandler: RemoveRoleCommandHandler,
    private disableAccountHandler: DisableAccountCommandHandler,
    private listUsersHandler: ListUsersQueryHandler,
    private searchUsersHandler: SearchUsersQueryHandler,
    private activateAccountHandler: ActivateAccountCommandHandler,
    private changePasswordHandler: ChangePasswordCommandHandler,
    private deleteAccountHandler: DeleteAccountCommandHandler,
    private changeEmailHandler: ChangeEmailCommandHandler,
    private unbanUserHandler: UnbanUserCommandHandler,
    private enableMfaHandler: EnableMfaCommandHandler,
    private listSessionsHandler: ListUserSessionsQueryHandler,
    private revokeAllSessionsHandler: RevokeAllUserSessionsCommandHandler,
    private unlockUserHandler: UnlockUserCommandHandler,
    private enableAccountHandler: EnableAccountCommandHandler,
    private revokeSessionHandler: RevokeSessionCommandHandler
  ) {
    super();
  }

  async listSessions(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const sessions = await this.listSessionsHandler.handle(new ListUserSessionsQuery(userId));
        res.status(200).json({ success: true, data: sessions });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async revokeAllSessions(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        await this.revokeAllSessionsHandler.handle(new RevokeAllUserSessionsCommand(userId));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async revokeSession(req: Request, res: Response): Promise<void> {
    try {
        const token = Array.isArray(req.params.token) ? req.params.token[0] : req.params.token;
        await this.revokeSessionHandler.handle(new RevokeSessionCommand(token));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async unlockUser(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userIdToUnlock } = req.body;
        const ipAddress = req.ip || '';
        await this.unlockUserHandler.handle(new UnlockUserCommand(adminUserId, userIdToUnlock, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async enableAccount(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userIdToEnable } = req.body;
        const ipAddress = req.ip || '';
        await this.enableAccountHandler.handle(new EnableAccountCommand(adminUserId, userIdToEnable, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async enableMfa(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const ipAddress = req.ip || '';
        const result = await this.enableMfaHandler.handle(new EnableMfaCommand(userId, ipAddress));
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async unbanUser(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userIdToUnban } = req.body;
        const ipAddress = req.ip || '';
        await this.unbanUserHandler.handle(new UnbanUserCommand(adminUserId, userIdToUnban, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async disableAccount(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const ipAddress = req.ip || '';
        await this.disableAccountHandler.handle(new DisableAccountCommand(userId, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const ipAddress = req.ip || '';
        const users = await this.listUsersHandler.handle(new ListUsersQuery(adminUserId, ipAddress));
        res.status(200).json({ success: true, data: users });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { searchTerm } = req.body;
        const ipAddress = req.ip || '';
        const users = await this.searchUsersHandler.handle(new SearchUsersQuery(adminUserId, searchTerm, ipAddress));
        res.status(200).json({ success: true, data: users });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async banUser(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userIdToBan } = req.body;
        const ipAddress = req.ip || '';
        await this.banUserHandler.handle(new BanUserCommand(adminUserId, userIdToBan, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async suspendUser(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userIdToSuspend } = req.body;
        const ipAddress = req.ip || '';
        await this.suspendUserHandler.handle(new SuspendUserCommand(adminUserId, userIdToSuspend, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async restoreUser(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userIdToRestore } = req.body;
        const ipAddress = req.ip || '';
        await this.restoreUserHandler.handle(new RestoreAccountCommand(userIdToRestore, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async assignRole(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userId, role } = req.body;
        const ipAddress = req.ip || '';
        await this.assignRoleHandler.handle(new AssignRoleCommand(adminUserId, userId, role, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async removeRole(req: Request, res: Response): Promise<void> {
    try {
        const adminUserId = (req as any).user?.id || '';
        const { userId, role } = req.body;
        const ipAddress = req.ip || '';
        await this.removeRoleHandler.handle(new RemoveRoleCommand(adminUserId, userId, role, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const { displayName } = req.body;
        const ipAddress = req.ip || '';
        await this.updateProfileHandler.handle(new UpdateProfileCommand(userId, displayName, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.body;
        const ipAddress = req.ip || '';
        await this.verifyEmailHandler.handle(new VerifyEmailCommand(userId, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
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
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || '';
        const userId = (req as any).user?.id || '';
        await this.logoutHandler.handle(new LogoutCommand(token, userId));
        
        res.clearCookie('token');
        res.status(204).send();
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
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
    } catch (error: any) {
        this.handleError(res, error);
    }
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

  async activateAccount(req: Request, res: Response): Promise<void> {
    try {
        const { userId } = req.body;
        const ipAddress = req.ip || '';
        await this.activateAccountHandler.handle(new ActivateAccountCommand(userId, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const { currentPassword, newPassword } = req.body;
        const ipAddress = req.ip || '';
        await this.changePasswordHandler.handle(new ChangePasswordCommand(userId, currentPassword, newPassword, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const ipAddress = req.ip || '';
        await this.deleteAccountHandler.handle(new DeleteAccountCommand(userId, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }

  async changeEmail(req: Request, res: Response): Promise<void> {
    try {
        const userId = (req as any).user?.id || '';
        const { newEmail } = req.body;
        const ipAddress = req.ip || '';
        await this.changeEmailHandler.handle(new ChangeEmailCommand(userId, newEmail, ipAddress));
        res.status(200).json({ success: true });
    } catch (error: any) {
        this.handleError(res, error);
    }
  }
}
