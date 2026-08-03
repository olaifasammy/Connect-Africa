import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ICommand } from '@shared/application/commands/ICommand';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class RefreshCommand implements ICommand {
  constructor(public readonly refreshToken: string, public readonly userId: string, public readonly ipAddress?: string) {}
}

export class RefreshCommandHandler implements ICommandHandler<RefreshCommand, string> {
  constructor(
    private jwtProvider: IJwtProvider
  ) {}

  async handle(command: RefreshCommand): Promise<string> {
    try {
      const userId = this.jwtProvider.verifyToken(command.refreshToken);
      
      const newToken = this.jwtProvider.generateToken(userId);

      AuditLogger.log({
        user: command.userId,
        action: 'REFRESH_TOKEN',
        resource: 'AUTH',
        status: 'SUCCESS',
        ipAddress: command.ipAddress
      });

      return newToken;
    } catch (error) {
      AuditLogger.log({
        user: command.userId,
        action: 'REFRESH_TOKEN',
        resource: 'AUTH',
        status: 'FAILURE',
        ipAddress: command.ipAddress
      });
      throw new AuthenticationError('Failed to refresh token');
    }
  }
}
