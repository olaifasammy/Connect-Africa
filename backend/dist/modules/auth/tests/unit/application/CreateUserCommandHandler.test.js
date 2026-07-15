"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterUserCommandHandler_1 = require("../../../../auth/application/handlers/RegisterUserCommandHandler");
const RegisterUserCommand_1 = require("../../../../auth/application/commands/RegisterUserCommand");
describe('RegisterUserCommandHandler', () => {
    let handler;
    let userRepository;
    let passwordHasher;
    let eventBus;
    beforeEach(() => {
        userRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
        };
        passwordHasher = { hash: jest.fn(), compare: jest.fn() };
        eventBus = { publish: jest.fn(), subscribe: jest.fn() };
        handler = new RegisterUserCommandHandler_1.RegisterUserCommandHandler(userRepository, passwordHasher, eventBus);
    });
    it('should create a user successfully', async () => {
        userRepository.findByEmail.mockResolvedValue(null);
        passwordHasher.hash.mockResolvedValue('hashed_password');
        const command = new RegisterUserCommand_1.RegisterUserCommand('test@connectafrica.com', 'password123', '127.0.0.1');
        await handler.handle(command);
        expect(userRepository.save).toHaveBeenCalled();
        expect(eventBus.publish).toHaveBeenCalled();
    });
});
//# sourceMappingURL=CreateUserCommandHandler.test.js.map