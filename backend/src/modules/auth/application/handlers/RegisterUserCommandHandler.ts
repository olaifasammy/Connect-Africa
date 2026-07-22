import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RegisterUserCommand } from '../commands/RegisterUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { User } from '@modules/auth/domain/entities/User';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserCreatedEvent } from '@modules/auth/domain/events/UserCreatedEvent';
import { UserAlreadyExistsError } from '@modules/auth/domain/errors/UserErrors';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

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
        await this.eventBus.publish(new AuditLogRequestedEvent({
          action: 'CREATE_USER',
          actorId: command.email,
          actorType: 'USER',
          ipAddress: command.ipAddress || '',
          userAgent: 'unknown',
          resourceId: 'AUTH',
          resourceType: 'AUTH',
          metadata: [{ key: 'status', value: 'FAILURE' }]
        }));
        throw new UserAlreadyExistsError(command.email);
      }

      const passwordHash = await this.passwordHasher.hash(command.password);
      const user = new User({
        email: new Email(command.email),
        passwordHash: new PasswordHash(passwordHash),
        isActive: false
      }, new UniqueEntityId());

      await this.userRepository.save(user);
      
      await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'CREATE_USER',
        actorId: user.id.toString(),
        actorType: 'USER',
        ipAddress: command.ipAddress || '',
        userAgent: 'unknown',
        resourceId: 'AUTH',
        resourceType: 'AUTH',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
      }));
      
      await this.eventBus.publish(new UserCreatedEvent(user.id, user.email.value));
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) throw error;
        
        await this.eventBus.publish(new AuditLogRequestedEvent({
          action: 'CREATE_USER',
          actorId: command.email,
          actorType: 'USER',
          ipAddress: command.ipAddress || '',
          userAgent: 'unknown',
          resourceId: 'AUTH',
          resourceType: 'AUTH',
          metadata: [{ key: 'status', value: 'FAILURE' }]
        }));
        throw error;
    }
  }
}
