"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserCommandHandler = void 0;
const User_1 = require("../../../auth/domain/entities/User");
const Email_1 = require("../../../auth/domain/value-objects/Email");
const PasswordHash_1 = require("../../../auth/domain/value-objects/PasswordHash");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const UserCreatedEvent_1 = require("../../../auth/domain/events/UserCreatedEvent");
const UserErrors_1 = require("../../../auth/domain/errors/UserErrors");
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
                AuditLogger_1.AuditLogger.log({ user: command.email, action: 'CREATE_USER', resource: 'AUTH', status: 'FAILURE', ipAddress: command.ipAddress });
                throw new UserErrors_1.UserAlreadyExistsError(command.email);
            }
            const passwordHash = await this.passwordHasher.hash(command.password);
            const user = new User_1.User({
                email: new Email_1.Email(command.email),
                passwordHash: new PasswordHash_1.PasswordHash(passwordHash),
                isActive: false
            }, new UniqueEntityId_1.UniqueEntityId());
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({ user: user.id.toString(), action: 'CREATE_USER', resource: 'AUTH', status: 'SUCCESS', ipAddress: command.ipAddress });
            await this.eventBus.publish(new UserCreatedEvent_1.UserCreatedEvent(user.id, user.email.value));
        }
        catch (error) {
            if (error instanceof UserErrors_1.UserAlreadyExistsError)
                throw error;
            AuditLogger_1.AuditLogger.log({ user: command.email, action: 'CREATE_USER', resource: 'AUTH', status: 'FAILURE', ipAddress: command.ipAddress });
            throw error;
        }
    }
}
exports.RegisterUserCommandHandler = RegisterUserCommandHandler;
//# sourceMappingURL=RegisterUserCommandHandler.js.map