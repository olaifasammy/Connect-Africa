"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCommandHandler = void 0;
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UserLoggedInEvent_1 = require("../../../auth/domain/events/UserLoggedInEvent");
const public_1 = require("../../../audit/public");
class LoginCommandHandler {
    userRepository;
    passwordHasher;
    jwtProvider;
    eventBus;
    constructor(userRepository, passwordHasher, jwtProvider, eventBus) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtProvider = jwtProvider;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const user = await this.userRepository.findByEmail(command.email);
        if (!user || !(await this.passwordHasher.compare(command.password, user.passwordHash.value))) {
            throw new AuthErrors_1.AuthenticationError('Invalid credentials');
        }
        await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
            action: 'LOGIN',
            actorId: user.id.toString(),
            actorType: 'USER',
            ipAddress: '127.0.0.1',
            userAgent: 'unknown',
            resourceId: user.id.toString(),
            resourceType: 'AUTH',
            metadata: [{ key: 'status', value: 'SUCCESS' }]
        }));
        await this.eventBus.publish(new UserLoggedInEvent_1.UserLoggedInEvent(user.id));
        return this.jwtProvider.generateToken(user.id.toString());
    }
}
exports.LoginCommandHandler = LoginCommandHandler;
//# sourceMappingURL=LoginCommandHandler.js.map