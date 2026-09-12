import {
  inject,
  injectable,
} from 'inversify';

import {
  provide,
} from 'inversify-binding-decorators';

import {
  ICommandHandler,
} from '@shared/application/handlers/ICommandHandler';

import {
  RevokeSessionCommand,
} from '@modules/auth/application/commands/RevokeSessionCommand';

import {
  ISessionRepository,
} from '@modules/auth/domain/repositories/ISessionRepository';

import {
  UniqueEntityId,
} from '@shared/domain/UniqueEntityId';

import {
  AuthenticationError,
} from '@modules/auth/domain/errors/AuthErrors';

@provide(
  RevokeSessionCommandHandler,
  true,
)
@injectable()
export class RevokeSessionCommandHandler
  implements
    ICommandHandler<
      RevokeSessionCommand,
      void
    >
{
  constructor(
    @inject('ISessionRepository')
    private readonly sessionRepository:
      ISessionRepository,
  ) {}

  async handle(
    command: RevokeSessionCommand,
  ): Promise<void> {
    try {
      await this.sessionRepository.invalidateSessionById(
        new UniqueEntityId(
          command.userId,
        ),
        command.sessionId,
      );
    } catch (error) {
      if (
        error instanceof
        AuthenticationError
      ) {
        throw error;
      }

      throw new AuthenticationError(
        'Failed to revoke session',
      );
    }
  }
}
