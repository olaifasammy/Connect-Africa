import { Request, Response } from 'express';
import { provide } from 'inversify-binding-decorators';
import { injectable } from 'inversify';
import { BaseController } from '@shared/interfaces/http/controllers/BaseController';

import { LoginCommand } from '@modules/auth/application/commands/LoginCommand';
import { LoginCommandHandler } from '@modules/auth/application/handlers/LoginCommandHandler';

import {
  LogoutCommand,
  LogoutCommandHandler,
} from '@modules/auth/application/handlers/LogoutCommandHandler';

import {
  RefreshCommand,
  RefreshCommandHandler,
} from '@modules/auth/application/handlers/RefreshCommandHandler';

import { RegisterUserCommandHandler } from '@modules/auth/application/handlers/RegisterUserCommandHandler';
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
import { VerifyMfaCommandHandler } from '@modules/auth/application/handlers/mfa/VerifyMfaCommandHandler';
import { ResetMfaCommandHandler } from '@modules/auth/application/handlers/ResetMfaCommandHandler';

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

import {
  EnableMfaCommand,
} from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';

import {
  VerifyMfaCommand,
} from '@modules/auth/application/commands/VerifyMfaCommand';

import {
  ResetMfaCommand,
} from '@modules/auth/application/commands/ResetMfaCommand';

import { appConfig } from '@config/app';

@provide(AuthController, true)
@injectable()
export class AuthController extends BaseController {
  constructor(
    private loginHandler: LoginCommandHandler,
    private logoutHandler: LogoutCommandHandler,
    private refreshHandler: RefreshCommandHandler,
    private registerUserHandler: RegisterUserCommandHandler,
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
    private verifyMfaHandler: VerifyMfaCommandHandler,
    private resetMfaHandler: ResetMfaCommandHandler,
    private listSessionsHandler: ListUserSessionsQueryHandler,
    private revokeAllSessionsHandler: RevokeAllUserSessionsCommandHandler,
    private unlockUserHandler: UnlockUserCommandHandler,
    private enableAccountHandler: EnableAccountCommandHandler,
    private revokeSessionHandler: RevokeSessionCommandHandler,
  ) {
    super();
  }

  async listSessions(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';

      const sessions = await this.listSessionsHandler.handle(
        new ListUserSessionsQuery(userId),
      );

      res.status(200).json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async revokeAllSessions(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';

      await this.revokeAllSessionsHandler.handle(
        new RevokeAllUserSessionsCommand(userId),
      );

      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async revokeSession(req: Request, res: Response): Promise<void> {
    try {
      const sessionId = Array.isArray(req.params.token)
        ? req.params.token[0]
        : req.params.token;

      const userId = (req as any).user?.id || '';

      await this.revokeSessionHandler.handle(
        new RevokeSessionCommand(
          userId,
          sessionId,
        ),
      );

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

      await this.unlockUserHandler.handle(
        new UnlockUserCommand(
          adminUserId,
          userIdToUnlock,
          ipAddress,
        ),
      );

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

      await this.enableAccountHandler.handle(
        new EnableAccountCommand(
          adminUserId,
          userIdToEnable,
          ipAddress,
        ),
      );

      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async enableMfa(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';
      const ipAddress = req.ip || '';
      const userAgent = req.get('user-agent') || '';

      const result = await this.enableMfaHandler.handle(
        new EnableMfaCommand(
          userId,
          ipAddress,
          userAgent,
        ),
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async verifyMfa(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';
      const { code } = req.body;
      const ipAddress = req.ip || '';
      const userAgent = req.get('user-agent') || '';

      await this.verifyMfaHandler.handle(
        new VerifyMfaCommand(
          userId,
          code,
          ipAddress,
          userAgent,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async resetMfa(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const { userId } = req.body;
      const ipAddress = req.ip || '';

      await this.resetMfaHandler.handle(
        new ResetMfaCommand(
          adminUserId,
          userId,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async unbanUser(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const { userIdToUnban } = req.body;
      const ipAddress = req.ip || '';

      await this.unbanUserHandler.handle(
        new UnbanUserCommand(
          adminUserId,
          userIdToUnban,
          ipAddress,
        ),
      );

      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async disableAccount(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const { userId } = req.body;
      const ipAddress = req.ip || '';

      await this.disableAccountHandler.handle(
        new DisableAccountCommand(
          adminUserId,
          userId,
          ipAddress,
        ),
      );

      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const ipAddress = req.ip || '';

      const users = await this.listUsersHandler.handle(
        new ListUsersQuery(
          adminUserId,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const { searchTerm } = req.body;
      const ipAddress = req.ip || '';

      const users = await this.searchUsersHandler.handle(
        new SearchUsersQuery(
          adminUserId,
          searchTerm,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async banUser(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const { userIdToBan } = req.body;
      const ipAddress = req.ip || '';

      await this.banUserHandler.handle(
        new BanUserCommand(
          adminUserId,
          userIdToBan,
          ipAddress,
        ),
      );

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

      await this.suspendUserHandler.handle(
        new SuspendUserCommand(
          adminUserId,
          userIdToSuspend,
          ipAddress,
        ),
      );

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

      await this.restoreUserHandler.handle(
        new RestoreAccountCommand(
          adminUserId,
          userIdToRestore,
          ipAddress,
        ),
      );

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

      await this.assignRoleHandler.handle(
        new AssignRoleCommand(
          adminUserId,
          userId,
          role,
          ipAddress,
        ),
      );

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

      await this.removeRoleHandler.handle(
        new RemoveRoleCommand(
          adminUserId,
          userId,
          role,
          ipAddress,
        ),
      );

      res.status(200).json({ success: true });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';
      const {
        displayName,
        bio,
        avatarUrl,
      } = req.body;

      const ipAddress = req.ip || '';

      await this.updateProfileHandler.handle(
        new UpdateProfileCommand(
          userId,
          displayName,
          bio,
          avatarUrl,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { userId, token } = req.body;
      const ipAddress = req.ip || '';

      await this.verifyEmailHandler.handle(
        new VerifyEmailCommand(
          userId,
          token,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      logger.info(
        'Register request received',
        { email: req.body.email },
      );

      const {
        email,
        password,
      } = req.body;

      await this.registerUserHandler.handle(
        new RegisterUserCommand(
          email,
          password,
        ),
      );

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      logger.error(
        'Register error',
        { error: error.message },
      );

      this.handleError(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const {
        email,
        password,
        mfaCode,
      } = req.body;

      const result = await this.loginHandler.handle(
        new LoginCommand(
          email,
          password,
          mfaCode,
        ),
      );

      res.cookie(
        'accessToken',
        result.accessToken,
        {
          httpOnly: true,
          secure: appConfig.nodeEnv === 'production',
          sameSite: 'strict',
          path: '/api/v1/auth',
          maxAge:
            appConfig.jwt.accessSessionTtlSeconds *
            1000,
        },
      );

      res.cookie(
        'refreshToken',
        result.refreshToken,
        {
          httpOnly: true,
          secure: appConfig.nodeEnv === 'production',
          sameSite: 'strict',
          path: '/api/v1/auth',
          maxAge:
            appConfig.jwt.refreshSessionTtlSeconds *
            1000,
        },
      );

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies?.refreshToken || '';
      const userId = (req as any).user?.id || '';

      await this.logoutHandler.handle(
        new LogoutCommand(
          token,
          userId,
        ),
      );

      res.clearCookie(
        'accessToken',
        {
          path: '/api/v1/auth',
        },
      );

      res.clearCookie(
        'refreshToken',
        {
          path: '/api/v1/auth',
        },
      );

      res.status(204).send();
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken =
        req.body.refreshToken ||
        req.cookies?.refreshToken ||
        '';

      const result =
        await this.refreshHandler.handle(
          new RefreshCommand(
            refreshToken,
            req.ip || '',
          ),
        );

      res.cookie(
        'accessToken',
        result.accessToken,
        {
          httpOnly: true,
          secure: appConfig.nodeEnv === 'production',
          sameSite: 'strict',
          path: '/api/v1/auth',
          maxAge:
            appConfig.jwt.accessSessionTtlSeconds *
            1000,
        },
      );

      res.cookie(
        'refreshToken',
        result.refreshToken,
        {
          httpOnly: true,
          secure: appConfig.nodeEnv === 'production',
          sameSite: 'strict',
          path: '/api/v1/auth',
          maxAge:
            appConfig.jwt.refreshSessionTtlSeconds *
            1000,
        },
      );

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        },
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const {
        email,
        newPassword,
        resetToken,
      } = req.body;

      const ipAddress = req.ip || '';

      await this.resetPasswordHandler.handle(
        new ResetPasswordCommand(
          email,
          newPassword,
          resetToken,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  protected async execute(
    req: Request,
    res: Response,
  ): Promise<void> {
    // Legacy mapping or specific endpoint logic.
  }

  async activateAccount(req: Request, res: Response): Promise<void> {
    try {
      const adminUserId = (req as any).user?.id || '';
      const { userId } = req.body;
      const ipAddress = req.ip || '';

      await this.activateAccountHandler.handle(
        new ActivateAccountCommand(
          adminUserId,
          userId,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';

      const {
        currentPassword,
        newPassword,
      } = req.body;

      const ipAddress = req.ip || '';

      await this.changePasswordHandler.handle(
        new ChangePasswordCommand(
          userId,
          currentPassword,
          newPassword,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';
      const ipAddress = req.ip || '';

      await this.deleteAccountHandler.handle(
        new DeleteAccountCommand(
          userId,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  async changeEmail(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id || '';
      const { newEmail } = req.body;
      const ipAddress = req.ip || '';

      await this.changeEmailHandler.handle(
        new ChangeEmailCommand(
          userId,
          newEmail,
          ipAddress,
        ),
      );

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }
}
