import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RegisterUserCommand } from '../commands/RegisterUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { User } from '@modules/auth/domain/entities/User';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserCreatedEvent } from '@modules/auth/domain/events/UserCreatedEvent';
import { UserAlreadyExistsError } from '@modules/auth/domain/errors/UserErrors';

export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand, void> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private eventBus: EventBus
  ) {}

  async handle(command: RegisterUserCommand): Promise<void> {
    try {
      const existingUser = await this.userRepository.findByEmail(command.email);
      if (existingUser) {
        AuditLogger.log({ user: command.email, action: 'CREATE_USER', resource: 'AUTH', status: 'FAILURE', ipAddress: command.ipAddress });
        throw new UserAlreadyExistsError(command.email);
      }

      const passwordHash = await this.passwordHasher.hash(command.password);
      const user = new User({
        email: new Email(command.email),
        passwordHash: new PasswordHash(passwordHash),
        isActive: false
      }, new UniqueEntityId());

      await this.userRepository.save(user);
      
      AuditLogger.log({ user: user.id.toString(), action: 'CREATE_USER', resource: 'AUTH', status: 'SUCCESS', ipAddress: command.ipAddress });
      
      await this.eventBus.publish(new UserCreatedEvent(user.id, user.email.value));
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) throw error;
        
        AuditLogger.log({ user: command.email, action: 'CREATE_USER', resource: 'AUTH', status: 'FAILURE', ipAddress: command.ipAddress });
        throw error;
    }
  }
}
