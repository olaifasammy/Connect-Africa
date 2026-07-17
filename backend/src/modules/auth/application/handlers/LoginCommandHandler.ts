import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { LoginCommand } from '../commands/LoginCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';
import { AuthenticationService } from '@modules/auth/domain/services/AuthenticationService';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { IAuditRepository } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserLoggedInEvent } from '@modules/auth/domain/events/UserLoggedInEvent';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';
import { AuditEntry } from '@modules/audit/domain/aggregates/AuditEntry';
import { AuditActor } from '@modules/audit/domain/entities/AuditActor';
import { AuditResource } from '@modules/audit/domain/entities/AuditResource';
import { AuditMetadata } from '@modules/audit/domain/entities/AuditMetadata';
import { CorrelationId, Timestamp, UserId, ResourceId, IPAddress, UserAgent } from '@modules/audit/domain/value-objects/AuditValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtProvider: IJwtProvider,
    private auditRepository: IAuditRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: LoginCommand): Promise<string> {
    const authService = new AuthenticationService(this.passwordHasher, new AuditLogger());
    const user = await this.userRepository.findByEmail(command.email);

    if (!user || !(await authService.verifyPassword(user, command.password))) {
      const auditEntry = AuditEntry.create({
        action: 'LOGIN',
        actor: AuditActor.create({
          userId: new UserId(command.email),
          actorType: 'USER',
          ipAddress: new IPAddress('127.0.0.1'),
          userAgent: new UserAgent('unknown')
        }),
        resource: AuditResource.create({
          id: new ResourceId(new UniqueEntityId().toString()),
          type: 'AUTH'
        }),
        metadata: [AuditMetadata.create({ key: 'status', value: 'FAILURE' })],
        correlationId: new CorrelationId(new UniqueEntityId().toString()),
        timestamp: new Timestamp(new Date())
      });
      await this.auditRepository.log(auditEntry);
      throw new AuthenticationError('Invalid credentials');
    }

    const successAuditEntry = AuditEntry.create({
      action: 'LOGIN',
      actor: AuditActor.create({
        userId: new UserId(user.id.toString()),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(user.id.toString()),
        type: 'AUTH'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    await this.auditRepository.log(successAuditEntry);
    
    // Emit domain event
    await this.eventBus.publish(new UserLoggedInEvent(user.id));
    
    return this.jwtProvider.generateToken(user.id.toString());
  }
}
