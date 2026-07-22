"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserCommandHandler = void 0;
const User_1 = require("../../../auth/domain/entities/User");
const Email_1 = require("../../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../../auth/domain/value-objects/PasswordHash");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const UserCreatedEvent_1 = require("../../../auth/domain/events/UserCreatedEvent");
const UserErrors_1 = require("../../../auth/domain/errors/UserErrors");
const AuditLogRequestedEvent_1 = require("../../../audit/domain/events/AuditLogRequestedEvent");
class RegisterUserCommandHandler {
    userRepository;
    passwordHasher;
    eventBus;
    constructor(userRepository, passwordHasher, eventBus) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const existingUser = await this.userRepository.findByEmail(command.email);
            if (existingUser) {
                await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
                    action: 'CREATE_USER',
                    actorId: command.email,
                    actorType: 'USER',
                    ipAddress: command.ipAddress || '',
                    userAgent: 'unknown',
                    resourceId: 'AUTH',
                    resourceType: 'AUTH',
                    metadata: [{ key: 'status', value: 'FAILURE' }]
                }));
                throw new UserErrors_1.UserAlreadyExistsError(command.email);
            }
            const passwordHash = await this.passwordHasher.hash(command.password);
            const user = new User_1.User({
                email: new Email_1.Email(command.email),
                passwordHash: new PasswordHash_1.PasswordHash(passwordHash),
                isActive: false
            }, new UniqueEntityId_1.UniqueEntityId());
            await this.userRepository.save(user);
            await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
                action: 'CREATE_USER',
                actorId: user.id.toString(),
                actorType: 'USER',
                ipAddress: command.ipAddress || '',
                userAgent: 'unknown',
                resourceId: 'AUTH',
                resourceType: 'AUTH',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
            await this.eventBus.publish(new UserCreatedEvent_1.UserCreatedEvent(user.id, user.email.value));
        }
        catch (error) {
            if (error instanceof UserErrors_1.UserAlreadyExistsError)
                throw error;
            await this.eventBus.publish(new AuditLogRequestedEvent_1.AuditLogRequestedEvent({
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
exports.RegisterUserCommandHandler = RegisterUserCommandHandler;
//# sourceMappingURL=RegisterUserCommandHandler.js.map