"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCommandHandler = void 0;
const AuthenticationService_1 = require("../../../auth/domain/services/AuthenticationService");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UserLoggedInEvent_1 = require("../../../auth/domain/events/UserLoggedInEvent");
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
class LoginCommandHandler {
    userRepository;
    passwordHasher;
    jwtProvider;
    auditRepository;
    eventBus;
    constructor(userRepository, passwordHasher, jwtProvider, auditRepository, eventBus) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtProvider = jwtProvider;
        this.auditRepository = auditRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        const authService = new AuthenticationService_1.AuthenticationService(this.passwordHasher, new AuditLogger_1.AuditLogger());
        const user = await this.userRepository.findByEmail(command.email);
        if (!user || !(await authService.verifyPassword(user, command.password))) {
            await this.auditRepository.log({ user: command.email, action: 'LOGIN', resource: 'AUTH', status: 'FAILURE' });
            throw new AuthErrors_1.AuthenticationError('Invalid credentials');
        }
        await this.auditRepository.log({ user: user.id.toString(), action: 'LOGIN', resource: 'AUTH', status: 'SUCCESS' });
        // Emit domain event
        await this.eventBus.publish(new UserLoggedInEvent_1.UserLoggedInEvent(user.id));
        return this.jwtProvider.generateToken(user.id.toString());
    }
}
exports.LoginCommandHandler = LoginCommandHandler;
//# sourceMappingURL=LoginCommandHandler.js.map