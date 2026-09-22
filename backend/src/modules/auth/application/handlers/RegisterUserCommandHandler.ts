import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { RegisterUserCommand } from '../commands/RegisterUserCommand';

import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IUserProfileRepository } from '@modules/auth/domain/repositories/IUserProfileRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';

import { User } from '@modules/auth/domain/entities/User';
import { UserProfile } from '@modules/auth/domain/entities/UserProfile';
import { AccountStatus } from '@modules/auth/domain/value-objects/AccountStatus';

import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UserId } from '@modules/auth/domain/value-objects/UserId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserCreatedEvent } from '@modules/auth/domain/events/UserCreatedEvent';

import { UserAlreadyExistsError } from '@modules/auth/domain/errors/UserErrors';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(RegisterUserCommandHandler, true)
@injectable()
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand, void>
{
  constructor(
    @inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @inject('IUserProfileRepository')
    private readonly profileRepository: IUserProfileRepository,

    @inject('IPasswordHasher')
    private readonly passwordHasher: IPasswordHasher,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  @Audit('CREATE_USER', 'AUTH')
  async handle(
    command: RegisterUserCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    if (!command.termsAccepted) {
      throw new AuthenticationError(
        'Terms and conditions must be accepted.',
      );
    }

    const existingUser =
      await this.userRepository.findByEmail(
        command.email,
      );

    if (existingUser) {
      throw new UserAlreadyExistsError(
        command.email,
      );
    }

    const passwordHash =
      await this.passwordHasher.hash(
        command.password,
      );

    const user =
      new User(
        {
          email:
            new Email(command.email),

          passwordHash:
            new PasswordHash(passwordHash),

          accountStatus:
            AccountStatus.PENDING_VERIFICATION,

          emailVerifiedAt:
            null,

          failedLoginAttempts:
            0,

          lockedUntil:
            null,

          termsAcceptedAt:
            new Date(),
        },
        new UniqueEntityId(),
      );

    await this.userRepository.save(
      user,
    );

    const profile =
      UserProfile.create({
        userId:
          UserId.create(user.id.toString()),
        displayName:
          command.displayName,
        country:
          command.country,
      });

    await this.profileRepository.save(
      profile,
    );

    await this.eventBus.publish(
      new UserCreatedEvent(
        user.id,
        user.email.value,
      ),
    );
  }
}
