import { ICommandHandler } from '../ICommandHandler';
import { ICommand } from '../../commands/ICommand';
import { IJwtProvider } from '@domain/auth/interfaces/IJwtProvider';

export class RefreshCommand implements ICommand {
  constructor(public readonly refreshToken: string) {}
}

export class RefreshCommandHandler implements ICommandHandler<RefreshCommand, string> {
  constructor(private jwtProvider: IJwtProvider) {}
  async handle(command: RefreshCommand): Promise<string> {
    const userId = this.jwtProvider.verifyToken(command.refreshToken);
    return this.jwtProvider.generateToken(userId);
  }
}
